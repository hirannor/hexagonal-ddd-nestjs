import { DomainEvent } from '@infrastructure/event/domain.event';
import { MessageId } from '@infrastructure/message/message-id';
import { ProductId } from '@domain/product/product-id';

export class ProductCreatedEvent implements DomainEvent {
  private readonly _id: MessageId;
  private readonly _productId: ProductId;
  private readonly _occurredOn: Date;
  private readonly _category: string;

  constructor(id: MessageId, productId: ProductId, occurredOn: Date) {
    this._id = id;
    this._productId = productId;
    this._occurredOn = occurredOn;
    this._category = 'product_created';
  }

  type(): string {
    return 'domain_event';
  }

  category(): string {
    return this._category;
  }

  public static record(productId: ProductId): ProductCreatedEvent {
    return new ProductCreatedEvent(MessageId.generate(), productId, new Date());
  }

  id(): MessageId {
    return this._id;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }

  get productId(): ProductId {
    return this._productId;
  }
}
