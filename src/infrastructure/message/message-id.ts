import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class MessageId {
  private readonly _uniqueComponent: string;

  constructor(uniqueComponent: string) {
    if (!uniqueComponent || !uuidValidate(uniqueComponent)) {
      throw new Error("Message UUID can't be null or invalid");
    }
    this._uniqueComponent = uniqueComponent;
  }

  static from(source: string): MessageId {
    if (!source || source.trim() === '') {
      throw new Error("Message can't be null or empty");
    }
    if (!uuidValidate(source)) {
      throw new Error('Invalid UUID string');
    }
    return new MessageId(source);
  }

  static generate(): MessageId {
    return new MessageId(uuidv4());
  }

  asText(): string {
    return this._uniqueComponent;
  }
}
