import { DomainEvent } from '@infrastructure/event/domain.event';

import { DomainEventFactory, DomainEventPayload } from './domain-event.types';
import { mapPayloadToEvent } from './product/product-created-event.mapper';

const factories: Record<string, DomainEventFactory> = {
  product_created: mapPayloadToEvent,
};

export function mapToDomainEvent(
  payload: DomainEventPayload,
): DomainEvent | null {
  if (
    !payload ||
    typeof payload !== 'object' ||
    typeof payload._type !== 'string'
  ) {
    return null;
  }

  const factory: DomainEventFactory = factories[payload._type];
  return factory ? factory(payload) : null;
}
