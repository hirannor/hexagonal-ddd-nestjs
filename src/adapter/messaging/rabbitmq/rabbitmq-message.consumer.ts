import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { DomainEventPayload } from './mappers/domain-event.types';
import { mapToDomainEvent } from './mappers/domain-event.mapper';
import { DomainEvent } from '@infrastructure/event/domain.event';

@Controller()
export class RabbitMqMessageConsumer {
  private readonly logger = new Logger(RabbitMqMessageConsumer.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @MessagePattern('domain_event')
  public handleDomainEvent(@Payload() payload: DomainEventPayload): {
    ok: boolean;
    reason?: string;
  } {
    const event: DomainEvent | null = mapToDomainEvent(payload);
    if (!event) {
      this.logger.warn(
        `Unsupported or malformed domain_event payload: ${JSON.stringify(payload)}`,
      );
      return { ok: false, reason: 'unsupported_or_malformed_event' };
    }

    this.eventEmitter.emit(event.category(), event);
    return { ok: true };
  }
}
