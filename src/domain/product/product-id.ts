import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class ProductId {
  private readonly _uniqueComponent: string;

  constructor(uniqueComponent: string) {
    if (!uniqueComponent || !uuidValidate(uniqueComponent)) {
      throw new Error("Message UUID can't be null or invalid");
    }
    this._uniqueComponent = uniqueComponent;
  }

  static from(source: string): ProductId {
    if (!source || source.trim() === '') {
      throw new Error("ProductId can't be null or empty");
    }
    if (!uuidValidate(source)) {
      throw new Error('Invalid UUID string');
    }
    return new ProductId(source);
  }

  static generate(): ProductId {
    return new ProductId(uuidv4());
  }

  asText(): string {
    return this._uniqueComponent;
  }
}
