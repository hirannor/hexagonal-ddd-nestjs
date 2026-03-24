import { DomainEvent } from '@infrastructure/event/domain.event';

export interface SerializedValueObject {
  _uniqueComponent?: string;
}

export interface DomainEventPayload {
  _category: string;
  _id?: SerializedValueObject | string;
  _occurredOn?: string | Date;
  [key: string]: unknown;
}

export type DomainEventFactory = (
  payload: DomainEventPayload,
) => DomainEvent | null;
