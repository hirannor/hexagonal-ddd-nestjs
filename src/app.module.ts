import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApplicationModule } from '@application/application.module';
import { WebRestModule } from '@adapter/web/web-rest.module';
import { selectRepositoryModule } from '@infrastructure/adapter/repository-adapter.config';
import { selectMessageAdapter } from '@infrastructure/adapter/message-adapter.config';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    selectRepositoryModule(),
    selectMessageAdapter(),
    ApplicationModule,
    WebRestModule,
  ],
})
export class AppModule {}
