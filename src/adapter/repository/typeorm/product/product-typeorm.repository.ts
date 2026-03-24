import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepository } from '@domain/product/product.repository';
import { Product } from '@domain/product/product';
import { ProductEntity } from './product.entity';
import { toDomain, toEntity } from './product.mapper';

@Injectable()
export class ProductTypeOrmRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly products: Repository<ProductEntity>,
  ) {}

  async fetchById(productId: string): Promise<Product | null> {
    const product: ProductEntity | null = await this.products.findOneBy({
      productId,
    });

    if (!product) return null;

    return toDomain(product);
  }

  async fetchAll(): Promise<Product[]> {
    const entities: ProductEntity[] = await this.products.find();
    return entities.map((value): Product => toDomain(value));
  }

  async save(product: Product): Promise<Product> {
    const toPersist: ProductEntity = toEntity(product);
    await this.products.save(toPersist);

    return product;
  }
}
