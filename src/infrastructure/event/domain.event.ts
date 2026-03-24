import { Message } from '@infrastructure/message/message';

export interface DomainEvent extends Message {
  occurredOn(): Date;
  type(): string;
}
