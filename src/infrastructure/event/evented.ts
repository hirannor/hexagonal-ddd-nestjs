import { DomainEvent } from '@infrastructure/event/domain.event';

export interface Evented {
  events(): ReadonlyArray<DomainEvent>;
  clearEvents(): void;
}
