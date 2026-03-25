import { Injectable } from '@nestjs/common';
import { RabbitmqClient } from './config/rabbitmq.client';
import { Message } from '@infrastructure/message/message';
import { MessagePublisher } from '@infrastructure/message/message-publisher';
import { MessagingPatterns } from '@adapter/messaging/rabbitmq/messaging-patterns';

@Injectable()
export class RabbitMqMessagePublisher implements MessagePublisher {
  constructor(private readonly rabbit: RabbitmqClient) {}

  async publish(messages: ReadonlyArray<Message>): Promise<void> {
    await Promise.all(
      messages.map((message: Message) => {
        return this.rabbit.send(MessagingPatterns.DOMAIN_EVENTS, message);
      }),
    );
  }
}
