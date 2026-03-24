import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { DomainEventPayload } from './mappers/domain-event.types';
import { mapToDomainEvent } from './mappers/domain-event.mapper';
import { DomainEvent } from '@infrastructure/event/domain.event';
import { MessagingPatterns } from '@adapter/messaging/rabbitmq/messaging-patterns';

@Controller()
export class RabbitMqMessageConsumer {
  private readonly logger = new Logger(RabbitMqMessageConsumer.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @EventPattern(MessagingPatterns.DOMAIN_EVENTS)
  public handleDomainEvent(@Payload() payload: DomainEventPayload): void {
    const event: DomainEvent | null = mapToDomainEvent(payload);
    if (!event) {
      this.logger.warn(
        `Unsupported or malformed domain.events payload: ${JSON.stringify(payload)}`,
      );
      return;
    }

    this.eventEmitter.emit(event.type(), event);
  }
}
