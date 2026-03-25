import { isUuid } from '@infrastructure/uuid';
import { randomUUID } from 'node:crypto';

export class ProductId {
  private readonly _uniqueComponent: string;

  constructor(uniqueComponent: string) {
    if (!uniqueComponent || !isUuid(uniqueComponent)) {
      throw new Error("Message UUID can't be null or invalid");
    }
    this._uniqueComponent = uniqueComponent;
  }

  static from(source: string): ProductId {
    if (!source || source.trim() === '') {
      throw new Error("ProductId can't be null or empty");
    }
    if (!isUuid(source)) {
      throw new Error('Invalid UUID string');
    }
    return new ProductId(source);
  }

  static generate(): ProductId {
    return new ProductId(randomUUID());
  }

  asText(): string {
    return this._uniqueComponent;
  }
}
