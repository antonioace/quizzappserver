import { Test, TestingModule } from '@nestjs/testing';
import { MessageGateweyService } from './message-gatewey.service';

describe('MessageGateweyService', () => {
  let service: MessageGateweyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageGateweyService],
    }).compile();

    service = module.get<MessageGateweyService>(MessageGateweyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
