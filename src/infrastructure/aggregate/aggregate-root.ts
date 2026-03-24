import { Evented } from '@infrastructure/event/evented';
import { DomainEvent } from '@infrastructure/event/domain.event';

export abstract class AggregateRoot implements Evented {
  private readonly _events: DomainEvent[] = [];

  clearEvents(): void {
    this._events.length = 0;
  }

  events(): DomainEvent[] {
    return this._events.slice();
  }

  protected addEvent(event: DomainEvent): void {
    this._events.push(event);
  }
}
