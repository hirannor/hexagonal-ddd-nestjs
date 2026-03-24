import { MessageId } from '@infrastructure/message/message-id';

export interface Message {
  id(): MessageId;
}
