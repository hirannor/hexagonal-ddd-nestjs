import { MessageAdapter } from '@infrastructure/adapter/message.adapter';
import { NoopMessagingModule } from '@adapter/messaging/noop/noop-messaging.module';
import { RabbitMqMessagingModule } from '@adapter/messaging/rabbitmq/rabbitmq-messaging.module';

const DEFAULT_MESSAGE_ADAPTER: MessageAdapter = MessageAdapter.NOOP;

function resolveMessageAdapter(value: string | undefined): MessageAdapter {
  switch (value) {
    case MessageAdapter.RABBITMQ:
      return MessageAdapter.RABBITMQ;
    case MessageAdapter.NOOP:
      return MessageAdapter.NOOP;
    default:
      return DEFAULT_MESSAGE_ADAPTER;
  }
}

export function selectMessageAdapter() {
  const messageAdapter: MessageAdapter = resolveMessageAdapter(
    process.env.MESSAGE_ADAPTER,
  );

  switch (messageAdapter) {
    case MessageAdapter.RABBITMQ:
      return RabbitMqMessagingModule;
    case MessageAdapter.NOOP:
    default:
      return NoopMessagingModule;
  }
}

export function isMessagingEnabled(): boolean {
  return (
    resolveMessageAdapter(process.env.MESSAGE_ADAPTER) !== MessageAdapter.NOOP
  );
}
