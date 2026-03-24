import { Message } from '@infrastructure/message/message';

export interface MessagePublisher<T extends Message = Message> {
  publish(messages: ReadonlyArray<T>): void;
}
