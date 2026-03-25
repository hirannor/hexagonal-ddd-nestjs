import { isUuid } from '@infrastructure/uuid';
import { randomUUID } from 'node:crypto';

export class MessageId {
  private readonly _uniqueComponent: string;

  constructor(uniqueComponent: string) {
    if (!uniqueComponent || !isUuid(uniqueComponent)) {
      throw new Error("Message UUID can't be null or invalid");
    }
    this._uniqueComponent = uniqueComponent;
  }

  static from(source: string): MessageId {
    if (!source || source.trim() === '') {
      throw new Error("Message can't be null or empty");
    }
    if (!isUuid(source)) {
      throw new Error('Invalid UUID string');
    }
    return new MessageId(source);
  }

  static generate(): MessageId {
    return new MessageId(randomUUID());
  }

  asText(): string {
    return this._uniqueComponent;
  }
}
