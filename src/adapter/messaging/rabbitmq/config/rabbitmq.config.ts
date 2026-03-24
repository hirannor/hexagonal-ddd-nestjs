import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export type RabbitMqConfig = {
  url: string;
  queue: string;
};

export function createRabbitMqConfig(
  configService: ConfigService,
): RabbitMqConfig {
  const url = configService.get<string>('RABBITMQ_URL');
  const queue = configService.get<string>('RABBITMQ_QUEUE');

  if (!url) {
    throw new Error('RABBITMQ_URL environment variable is required');
  }
  if (!queue) {
    throw new Error('RABBITMQ_QUEUE environment variable is required');
  }

  return { url, queue };
}

export function createRabbitMqMicroserviceConfig(
  configService: ConfigService,
): MicroserviceOptions {
  const config = createRabbitMqConfig(configService);

  return {
    transport: Transport.RMQ,
    options: {
      urls: [config.url] as string[],
      queue: config.queue,
      queueOptions: { durable: true },
    },
  } as MicroserviceOptions;
}
