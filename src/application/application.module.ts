import { Module } from '@nestjs/common';
import { ProductEventHandler } from '@application/events/product-event.handler';
import { ProductService } from '@application/services/product.service';
import {
  PRODUCT_CREATE_USE_CASE,
  PRODUCT_QUERY_USE_CASE,
} from '@application/tokens/service.tokens';

@Module({
  providers: [
    ProductEventHandler,
    {
      provide: PRODUCT_QUERY_USE_CASE,
      useClass: ProductService,
    },
    {
      provide: PRODUCT_CREATE_USE_CASE,
      useClass: ProductService,
    },
  ],
  exports: [PRODUCT_QUERY_USE_CASE, PRODUCT_CREATE_USE_CASE],
})
export class ApplicationModule {}
