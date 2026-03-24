import { Product } from '@domain/product';
import { CreateProduct } from '@domain/product/create-product';

export interface ProductCreating {
  create(command: CreateProduct): Promise<Product>;
}
