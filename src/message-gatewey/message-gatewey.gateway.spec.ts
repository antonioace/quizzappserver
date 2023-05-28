import { Test, TestingModule } from '@nestjs/testing';
import { MessageGateweyGateway } from './message-gatewey.gateway';
import { MessageGateweyService } from './message-gatewey.service';

describe('MessageGateweyGateway', () => {
  let gateway: MessageGateweyGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageGateweyGateway, MessageGateweyService],
    }).compile();

    gateway = module.get<MessageGateweyGateway>(MessageGateweyGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
