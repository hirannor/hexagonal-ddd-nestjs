import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { createRabbitMqMicroserviceConfig } from '@adapter/messaging/rabbitmq/config/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rabbitMqConfig = createRabbitMqMicroserviceConfig(configService);
  app.connectMicroservice(rabbitMqConfig);

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error: unknown) => {
  console.error('Application failed to start', error);
  process.exit(1);
});
