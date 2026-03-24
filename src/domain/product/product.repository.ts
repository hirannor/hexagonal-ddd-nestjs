import { Product } from './product';

export interface ProductRepository {
  fetchAll(): Promise<Product[]>;
  fetchById(productId: string): Promise<Product | null>;
  save(product: Product): Promise<Product>;
}
