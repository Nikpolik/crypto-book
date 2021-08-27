import { EventType, ProductId } from "../messages";

export interface Payload {
  event: EventType;
  feed: "book_ui_1";
  product_ids: [ProductId];
}

const createPayload = (
  productId: ProductId,
  eventType: EventType
): Payload => ({
  event: eventType,
  feed: "book_ui_1",
  product_ids: [productId],
});

export { createPayload };
