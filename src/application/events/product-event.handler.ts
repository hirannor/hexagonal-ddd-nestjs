import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductCreatedEvent } from '@domain/product';

@Injectable()
export class ProductEventHandler {
  private readonly logger = new Logger(ProductEventHandler.name);

  @OnEvent('product_created')
  handle(event: ProductCreatedEvent) {
    this.logger.log(
      `Received event: ${event.constructor.name} with id: ${event.id().asText()}, occurred on: ${event.occurredOn().toUTCString()}`,
    );
  }
}
