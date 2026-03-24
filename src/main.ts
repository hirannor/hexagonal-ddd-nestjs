import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rabbitMqUrl = configService.get<string>('RABBITMQ_URL');
  const rabbitMqQueue = configService.get<string>('RABBITMQ_QUEUE');

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUrl],
      queue: rabbitMqQueue,
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Application failed to start', error);
  process.exit(1);
});
