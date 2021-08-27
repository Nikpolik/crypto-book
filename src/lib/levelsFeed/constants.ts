import { ProductId } from "./messages";

enum ConnectionState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  RECONNECTING = "RECONNECTING",
}

const validTicks: Record<ProductId, number[]> = {
  PI_ETHUSD: [0.05, 0.1, 0.25],
  PI_XBTUSD: [0.5, 1, 2.5],
};

export { validTicks, ConnectionState };
