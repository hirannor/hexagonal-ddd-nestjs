import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RABBITMQ_CONFIG } from './messaging.tokens';
import { RabbitmqClient } from './config/rabbitmq.client';
import { RabbitMqMessagePublisher } from './rabbitmq-message.publisher';
import { RabbitMqMessageConsumer } from './rabbitmq-message.consumer';
import { MESSAGE_PUBLISHER } from '@infrastructure/infrastructure.tokens';
import { createRabbitMqConfig } from './config/rabbitmq.config';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [RabbitMqMessageConsumer],
  providers: [
    {
      provide: RABBITMQ_CONFIG,
      inject: [ConfigService],
      useFactory: createRabbitMqConfig,
    },
    RabbitmqClient,
    {
      provide: MESSAGE_PUBLISHER,
      useClass: RabbitMqMessagePublisher,
    },
  ],
  exports: [MESSAGE_PUBLISHER],
})
export class RabbitMqMessagingModule {}
