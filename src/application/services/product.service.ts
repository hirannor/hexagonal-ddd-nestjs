import { Inject, Injectable, Logger } from '@nestjs/common';
import { ProductDisplaying } from '../usecases/product-displaying';
import { Product } from '@domain/product/product';
import type { ProductRepository } from '@domain/product';
import { ProductCreating } from '@application/usecases/product-creating';
import { CreateProduct } from '@domain/product/create-product';
import { ProductNotFoundError } from '@application/errors/product-not-found.error';
import { PRODUCT_REPOSITORY } from '@application/tokens/repository.tokens';
import { MESSAGE_PUBLISHER } from '@infrastructure/infrastructure.tokens';
import { MessagePublisher } from '@infrastructure/message/message-publisher';

@Injectable()
export class ProductService implements ProductDisplaying, ProductCreating {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly products: ProductRepository,
    @Inject(MESSAGE_PUBLISHER) private readonly messages: MessagePublisher,
  ) {}

  async displayById(id: string): Promise<Product> {
    this.logger.log(`Start fetching product with id: ${id}`);

    const product: Product | null = await this.products.fetchById(id);

    if (product == null) {
      throw new ProductNotFoundError(id);
    }

    this.logger.log(`Product with id: ${id} fetched successfully!`);

    return product;
  }

  async create(command: CreateProduct): Promise<Product> {
    this.logger.log('Start Saving product');

    const product: Product = Product.create(command);

    await this.products.save(product);
    await this.messages.publish(product.events());

    this.logger.log(
      `Product with id: ${product.id.asText()} saved successfully!`,
    );

    return product;
  }

  async displayAll(): Promise<Product[]> {
    this.logger.log('Start fetching all products');

    const products: Product[] = await this.products.fetchAll();

    this.logger.log('Fetching all products was successful');

    return products;
  }
}
