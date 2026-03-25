import { ProductCreatedEvent } from '@domain/product/product-created.event';
import { ProductId } from '@domain/product/product-id';
import { MessageId } from '@infrastructure/message/message-id';
import { DomainEvent } from '@infrastructure/event/domain.event';

import { DomainEventPayload } from '../domain-event.types';
import { parseDate, readUniqueComponent } from '../domain-event-parsers';

export function mapPayloadToEvent(
  payload: DomainEventPayload,
): DomainEvent | null {
  const eventId: string | null = readUniqueComponent(payload._id);
  const occurredOn: Date | null = parseDate(payload._occurredOn);
  const productIdAsText: string | null = readUniqueComponent(
    payload._productId,
  );

  if (!eventId || !occurredOn || !productIdAsText) {
    return null;
  }

  return new ProductCreatedEvent(
    new MessageId(eventId),
    new ProductId(productIdAsText),
    occurredOn,
  );
}
