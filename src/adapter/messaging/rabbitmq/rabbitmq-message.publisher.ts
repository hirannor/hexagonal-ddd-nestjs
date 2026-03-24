import { Injectable } from '@nestjs/common';
import { RabbitMqConnection } from './config/rabbitmq.connection';
import { Message } from '@infrastructure/message/message';
import { MessagePublisher } from '@infrastructure/message/message-publisher';

@Injectable()
export class RabbitMqMessagePublisher implements MessagePublisher {
  constructor(private readonly rabbit: RabbitMqConnection) {}

  async publish(messages: ReadonlyArray<Message>): Promise<void> {
    await Promise.all(
      messages.map((message: Message) => {
        const pattern = message.type();
        return this.rabbit.send(pattern, message);
      }),
    );
  }
}
