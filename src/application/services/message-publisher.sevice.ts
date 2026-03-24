import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessagePublisher } from '@infrastructure/message/message-publisher';
import { Message } from '@infrastructure/message/message';

@Injectable()
export class MessagePublisherService implements MessagePublisher {
  constructor(private readonly events: EventEmitter2) {}

  publish(messages: ReadonlyArray<Message>): void {
    messages.forEach((message) => {
      this.events.emit(message.constructor.name, message);
    });
  }
}
