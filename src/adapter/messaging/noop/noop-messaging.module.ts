import { Global, Module } from '@nestjs/common';
import { MESSAGE_PUBLISHER } from '@infrastructure/infrastructure.tokens';
import { NoopMessagePublisher } from './noop-message.publisher';

@Global()
@Module({
  providers: [
    NoopMessagePublisher,
    {
      provide: MESSAGE_PUBLISHER,
      useExisting: NoopMessagePublisher,
    },
  ],
  exports: [MESSAGE_PUBLISHER],
})
export class NoopMessagingModule {}
