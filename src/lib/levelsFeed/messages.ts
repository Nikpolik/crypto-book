import { ConnectionState } from "./constants";
import { GroupedLevel } from "./models/level";

// Contains definitions for messages that are passed between the worker and the main thread
export type ProductId = "PI_XBTUSD" | "PI_ETHUSD";
export type EventType = "subscribe" | "unsubscribe";

// Incoming Messages from main thread to worker
export interface ConnectMessage {
  type: "connection/connect";
}

const createConnectMessage = (): ConnectMessage => ({
  type: "connection/connect",
});

export interface SubscribeMessage {
  type: "feed/subscribe";
  payload: {
    productId: ProductId;
    tick: number;
  };
}

const createSubscribeMessage = (
  productId: ProductId,
  tick: number
): SubscribeMessage => ({
  type: "feed/subscribe",
  payload: {
    productId,
    tick,
  },
});

export interface SetTickMessage {
  type: "feed/setTick";
  payload: {
    tick: number;
  };
}

const createSetTickMessage = (tick: number): SetTickMessage => ({
  type: "feed/setTick",
  payload: {
    tick,
  },
});

export interface HcfMessage {
  type: "connection/hcf";
}

const createHcfMessage = (): HcfMessage => ({
  type: "connection/hcf",
});

export type IncomingMessage =
  | ConnectMessage
  | SubscribeMessage
  | SetTickMessage
  | HcfMessage;

// Outgoing Messages from worker to main thread

export interface ConnectionStateMessage {
  type: "connection/setConnectionState";
  payload: {
    connectionState: ConnectionState;
  };
}

const createConnectionStateMessage = (
  connectionState: ConnectionState
): ConnectionStateMessage => ({
  type: "connection/setConnectionState",
  payload: {
    connectionState,
  },
});

export interface ErrorMessage {
  type: "connection/setError";
  payload: {
    reason: string;
  };
}

const createErrorMessage = (reason: string): ErrorMessage => ({
  type: "connection/setError",
  payload: {
    reason,
  },
});

export interface UpdateLevelsMessage {
  type: "feed/updateLevels";
  payload: {
    bids: GroupedLevel[];
    asks: GroupedLevel[];
    activeProductId: ProductId;
    tick: number;
  };
}

const createUpdateLevelsMessage = ({
  bids,
  asks,
  tick,
  activeProductId,
}: {
  bids: GroupedLevel[];
  asks: GroupedLevel[];
  tick: number;
  activeProductId: ProductId;
}): UpdateLevelsMessage => ({
  type: "feed/updateLevels",
  payload: {
    asks,
    bids,
    tick,
    activeProductId,
  },
});

export type OutgoingMessage =
  | ConnectionStateMessage
  | ErrorMessage
  | UpdateLevelsMessage;

const isIncomingMessage = (data: any): data is IncomingMessage => {
  return typeof data === "object";
};

const isOutgoingMessage = (data: any): data is OutgoingMessage => {
  return typeof data === "object" && data.type;
};

export {
  isIncomingMessage,
  isOutgoingMessage,
  createErrorMessage,
  createUpdateLevelsMessage,
  createConnectionStateMessage,
  createSubscribeMessage,
  createConnectMessage,
  createSetTickMessage,
  createHcfMessage,
};
