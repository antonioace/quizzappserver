import { Test, TestingModule } from '@nestjs/testing';
import { ServicegenericService } from './servicegeneric.service';

describe('ServicegenericService', () => {
  let service: ServicegenericService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicegenericService],
    }).compile();

    service = module.get<ServicegenericService>(ServicegenericService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
