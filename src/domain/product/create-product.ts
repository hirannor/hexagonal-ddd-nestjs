import { ProductId } from '@domain/product/product-id';

export class CreateProduct {
  constructor(
    public readonly productId: ProductId,
    public readonly name: string,
  ) {}

  static issue(name: string): CreateProduct {
    return new CreateProduct(ProductId.generate(), name);
  }
}
