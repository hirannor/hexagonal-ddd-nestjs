import { ProductCreatedEvent } from '@domain/product/product-created.event';
import { ProductId } from '@domain/product/product-id';
import { MessageId } from '@infrastructure/message/message-id';
import { DomainEvent } from '@infrastructure/event/domain.event';

import { DomainEventPayload } from '../domain-event.types';
import { parseDate, readUniqueComponent } from '../domain-event-parsers';

export function mapProductCreatedEvent(
  payload: DomainEventPayload,
): DomainEvent | null {
  const eventId = readUniqueComponent(payload._id);
  const occurredOn = parseDate(payload._occurredOn);
  const productId = readUniqueComponent(payload._productId);

  if (!eventId || !occurredOn || !productId) {
    return null;
  }

  return new ProductCreatedEvent(
    new MessageId(eventId),
    new ProductId(productId),
    occurredOn,
  );
}
