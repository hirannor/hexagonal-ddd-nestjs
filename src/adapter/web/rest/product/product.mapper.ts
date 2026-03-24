import { Product } from '@domain/product';
import { ProductModel } from './product.model';
import { CreateProduct } from '@domain/product/create-product';
import { CreateProductModel } from './create-product.model';

export function toModel(domain: Product): ProductModel {
  return {
    id: domain.id.asText(),
    name: domain.name,
  };
}

export function toCommand(model: CreateProductModel): CreateProduct {
  return CreateProduct.issue(model.name);
}
