import { Module } from '@nestjs/common';
import { ProductController } from './rest/product';
import { ApplicationModule } from '@application/application.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@adapter/web/global-exception.filter';

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
