import { CreateProduct } from '@domain/product/create-product';
import { AggregateRoot } from '@infrastructure/aggregate/aggregate-root';
import { ProductCreatedEvent } from '@domain/product/product-created.event';
import { ProductId } from '@domain/product/product-id';

export class Product extends AggregateRoot {
  private readonly _id: ProductId;
  private readonly _name: string;

  constructor(id: ProductId, name: string) {
    super();
    this._id = id;
    this._name = name;
  }

  static create(command: CreateProduct): Product {
    const createdProduct: Product = new Product(
      command.productId,
      command.name,
    );
    createdProduct.addEvent(ProductCreatedEvent.record(createdProduct.id));
    return createdProduct;
  }

  get id(): ProductId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
