import {
  createConnectionStateMessage,
  createErrorMessage,
  createUpdateLevelsMessage,
  isIncomingMessage,
  OutgoingMessage,
  ProductId,
} from "../messages";
import { createLevelsMap, updateLevelsMap, groupByPrice } from "./utils";

import setupSocket, { Socket } from "./socket";
import { ConnectionState } from "../constants";
import { createPayload } from "./payloads";
import { Level } from "../models";

const SYNC_INTERVAL = 1000;

// State
let socket: Socket | null = null;
let levels: { asks: Map<number, Level>; bids: Map<number, Level> } = {
  asks: new Map(),
  bids: new Map(),
};
let syncTimeout: number | null = null;
let tick = 1;
let activeProductId: ProductId = "PI_ETHUSD";

onmessage = (message) => {
  const sendMessage = postMessage as (message: OutgoingMessage) => void;
  const data = message.data;

  if (!isIncomingMessage(data)) return;

  switch (data.type) {
    case "connection/connect": {
      // create socket and the handlers for socket events
      const syncLevels = () => {
        if (syncTimeout) clearTimeout(syncTimeout);

        sendMessage(
          createUpdateLevelsMessage({
            asks: groupByPrice(Array.from(levels.asks.values()), tick),
            bids: groupByPrice(Array.from(levels.bids.values()), tick),
            activeProductId,
            tick,
          })
        );
        syncTimeout = setTimeout(syncLevels, SYNC_INTERVAL) as any;
      };

      const onOpen = () => {
        if (!socket) return;

        sendMessage(createConnectionStateMessage(ConnectionState.OPEN));
        sendMessage(createErrorMessage(""));
        socket.emitMessage(createPayload("PI_XBTUSD", "subscribe"));
      };

      const onMessage = (e: MessageEvent) => {
        const update = JSON.parse(e.data);
        if (update?.feed === "book_ui_1_snapshot") {
          levels.asks = createLevelsMap(update.asks);
          levels.bids = createLevelsMap(update.bids);
          syncLevels(); // received new product start syncing levels
        }
        if (update?.feed === "book_ui_1") {
          const { asks: deltaAsks, bids: deltaBids } = update;
          levels.asks = updateLevelsMap(levels.asks, deltaAsks || []);
          levels.bids = updateLevelsMap(levels.bids, deltaBids || []);
        }
      };

      const onError = (ev: any) => {
        const message = ev.message || ev.reason || "Uknown error occured";

        sendMessage(createErrorMessage(message));
        sendMessage(createConnectionStateMessage(ConnectionState.RECONNECTING));
      };

      socket = setupSocket({ onMessage, onOpen, onError });
      break;
    }
    case "feed/subscribe": {
      if (!socket) return;

      const { productId, tick: newTick } = data.payload;
      const otherProduct: ProductId =
        productId === "PI_ETHUSD" ? "PI_XBTUSD" : "PI_ETHUSD";

      activeProductId = productId;
      tick = newTick;

      socket.emitMessage(createPayload(productId, "subscribe"));
      socket.emitMessage(createPayload(otherProduct, "unsubscribe"));
      break;
    }
    case "feed/setTick": {
      tick = data.payload.tick;
      break;
    }
    case "connection/hcf": {
      if (socket) socket.hcf();
    }
  }
};
