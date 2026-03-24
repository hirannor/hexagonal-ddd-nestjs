import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RABBITMQ_CONFIG } from './messaging.tokens';
import { RabbitMqConnection } from './config/rabbitmq.connection';
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
    RabbitMqConnection,
    {
      provide: MESSAGE_PUBLISHER,
      useClass: RabbitMqMessagePublisher,
    },
  ],
  exports: [MESSAGE_PUBLISHER],
})
export class RabbitMqMessagingModule {}
