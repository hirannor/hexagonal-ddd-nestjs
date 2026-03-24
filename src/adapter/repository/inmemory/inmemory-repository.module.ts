import { Global, Module } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '@application/tokens/repository.tokens';
import { ProductInMemoryRepository } from './product';

@Global()
@Module({
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductInMemoryRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class InMemoryRepositoryModule {}
