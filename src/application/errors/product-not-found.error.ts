export class ProductNotFoundError extends Error {
  constructor(public readonly productId: string) {
    super(`Product with id ${productId} not found`);
    Object.setPrototypeOf(this, ProductNotFoundError.prototype);
  }
}
