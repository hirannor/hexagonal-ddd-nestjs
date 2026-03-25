import { Injectable, Logger } from '@nestjs/common';
import { MessagePublisher } from '@infrastructure/message/message-publisher';
import { Message } from '@infrastructure/message/message';

@Injectable()
export class NoopMessagePublisher implements MessagePublisher {
  private readonly logger = new Logger(NoopMessagePublisher.name);

  publish(messages: ReadonlyArray<Message>): Promise<void> {
    if (messages.length > 0) {
      this.logger.debug(
        `Skipping publish for ${messages.length} message(s) because messaging is disabled`,
      );
    }

    return Promise.resolve();
  }
}
