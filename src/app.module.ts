import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApplicationModule } from '@application/application.module';
import { WebRestModule } from '@adapter/web/web-rest.module';
import { selectRepositoryModule } from '@infrastructure/repository/repository-adapter.config';
import { RabbitMqMessagingModule } from '@adapter/messaging/rabbitmq/rabbitmq-messaging.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    selectRepositoryModule(),
    ApplicationModule,
    WebRestModule,
    RabbitMqMessagingModule,
  ],
})
export class AppModule {}
