import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@adapter/web/global-exception.filter';
import { ProductController } from '@adapter/web/rest/product/product.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [ProductController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class WebRestModule {}
