import { Injectable } from '@nestjs/common';
import { Product } from '@domain/product';
import { ProductRepository } from '@domain/product/product.repository';

@Injectable()
export class ProductInMemoryRepository implements ProductRepository {
  private readonly products = new Map<string, Product>();

  fetchAll(): Promise<Product[]> {
    return Promise.resolve(Array.from(this.products.values()));
  }

  fetchById(productId: string): Promise<Product | null> {
    return Promise.resolve(this.products.get(productId) ?? null);
  }

  save(product: Product): Promise<Product> {
    this.products.set(product.id.asText(), product);
    return Promise.resolve(product);
  }
}
