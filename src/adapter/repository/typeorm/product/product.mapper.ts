import { Product } from '@domain/product/product';
import { ProductEntity } from './product.entity';
import { ProductId } from '@domain/product/product-id';

export function toDomain(entity: ProductEntity): Product {
  return new Product(ProductId.from(entity.productId), entity.name);
}

export function toEntity(domain: Product): ProductEntity {
  const entity = new ProductEntity();
  entity.productId = domain.id.asText();
  entity.name = domain.name;
  return entity;
}
