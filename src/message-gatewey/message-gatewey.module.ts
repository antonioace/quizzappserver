import { Module } from '@nestjs/common';
import { MessageGateweyService } from './message-gatewey.service';
import { MessageGateweyGateway } from './message-gatewey.gateway';

@Module({
  providers: [MessageGateweyGateway, MessageGateweyService]
})
export class MessageGateweyModule {}
