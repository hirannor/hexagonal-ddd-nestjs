import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RabbitMqConfig } from './rabbitmq.config';
import { RABBITMQ_CONFIG } from '../messaging.tokens';
import { Message } from '@infrastructure/message/message';

@Injectable()
export class RabbitmqClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitmqClient.name);

  private client!: ClientProxy;

  constructor(
    @Inject(RABBITMQ_CONFIG) private readonly config: RabbitMqConfig,
  ) {}

  async onModuleInit(): Promise<void> {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.config.url],
        queue: this.config.queue,
        queueOptions: { durable: true },
      },
    });

    await this.client.connect();
    this.logger.log(`Connected to RabbitMQ queue "${this.config.queue}"`);
  }

  async send(pattern: string, payload: Message): Promise<void> {
    this.logger.debug(`Publishing pattern="${pattern}"`);

    await lastValueFrom(this.client.emit(pattern, payload));
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.logger.debug('RabbitMQ client closed');
    }
  }
}
