import { Module } from '@nestjs/common';
import { ProductEventHandler } from '@application/events/product-event.handler';
import { ProductService } from '@application/services/product.service';
import { MessagePublisherService } from '@application/services/message-publisher.sevice';
import {
  PRODUCT_CREATE_USE_CASE,
  PRODUCT_QUERY_USE_CASE,
} from '@application/tokens/service.tokens';
import { MESSAGE_PUBLISHER_SERVICE } from '@infrastructure/infrastructure.tokens';

@Module({
  providers: [
    ProductEventHandler,
    {
      provide: MESSAGE_PUBLISHER_SERVICE,
      useClass: MessagePublisherService,
    },
    {
      provide: PRODUCT_QUERY_USE_CASE,
      useClass: ProductService,
    },
    {
      provide: PRODUCT_CREATE_USE_CASE,
      useClass: ProductService,
    },
  ],
  exports: [
    MESSAGE_PUBLISHER_SERVICE,
    PRODUCT_QUERY_USE_CASE,
    PRODUCT_CREATE_USE_CASE,
  ],
})
export class ApplicationModule {}
