import { Test, TestingModule } from '@nestjs/testing';
import { MatchTeamMemberService } from './match-team-member.service';

describe('MatchTeamMemberService', () => {
  let service: MatchTeamMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchTeamMemberService]
    }).compile();

    service = module.get<MatchTeamMemberService>(MatchTeamMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
