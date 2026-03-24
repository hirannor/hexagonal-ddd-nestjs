import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RABBITMQ_CONFIG } from './tokens';
import { RabbitMqConnection } from './config/rabbitmq.connection';
import { RabbitMqMessagePublisher } from './rabbitmq-message.publisher';
import { RabbitMqMessageConsumer } from './rabbitmq-message.consumer';
import { MESSAGE_PUBLISHER } from '@infrastructure/infrastructure.tokens';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [RabbitMqMessageConsumer],
  providers: [
    {
      provide: RABBITMQ_CONFIG,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('RABBITMQ_URL'),
        queue: configService.get<string>('RABBITMQ_QUEUE'),
      }),
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
