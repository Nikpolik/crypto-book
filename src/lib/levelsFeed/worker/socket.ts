import { SOCKET_URL } from "../../../config";
import { Payload } from "./payloads";

const RECONNECT_DELAY = 1000 * 10; // 10 seconds
const MAX_RECONNECT_ATTEMPTS = 2;

let reconnectTimeout: number | null = null;
let socket: WebSocket | null = null;
let reconnectAttempts = 0;
let queue: Payload[] = [];

interface SocketConfig {
  onOpen: (ev: Event) => any;
  onMessage: (ev: MessageEvent) => any;
  onError: (ev: Event) => any;
}

const setupSocket = ({ onMessage, onOpen, onError }: SocketConfig) => {
  const createSocket = () => {
    socket = new WebSocket(SOCKET_URL);
    socket.onopen = handleOpen;
    socket.onmessage = onMessage;
    socket.onerror = handleError;
    socket.onclose = handleError;
  };

  const handleOpen = (ev: Event) => {
    onOpen(ev);
    const prev = [...queue];
    queue = [];
    prev.forEach(emitMessage);
  };

  const handleReconnect = (force = false) => {
    if (socket) return;

    if (reconnectAttempts > MAX_RECONNECT_ATTEMPTS && !force) return;

    reconnectAttempts += 1;
    createSocket();
  };

  const handleError = (ev: Event) => {
    if (reconnectTimeout) clearTimeout(reconnectTimeout);

    socket = null;
    onError(ev);
    reconnectTimeout = setTimeout(handleReconnect, RECONNECT_DELAY) as any;
  };

  const emitMessage = (message: Payload) => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify(message));
      return;
    }
    queue.push(message);
  };

  const getSocket = () => socket;

  // initialize socket on first run
  createSocket();

  const hcf = () => {
    if (socket) {
      socket.close(3000);
      return;
    }
    handleReconnect(true);
  };

  return {
    emitMessage,
    getSocket,
    hcf,
  };
};

export type Socket = ReturnType<typeof setupSocket>;
export default setupSocket;
