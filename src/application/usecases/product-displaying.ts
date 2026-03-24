import { Product } from '@domain/product';

export interface ProductDisplaying {
  displayAll(): Promise<Product[]>;
  displayById(id: string): Promise<Product>;
}
