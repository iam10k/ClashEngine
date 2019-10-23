import { Entity, ManyToOne, Unique } from 'typeorm';
import { TeamEntity } from '../../team/entities';
import { EloEntity } from './elo.entity';

@Entity('team_elo')
@Unique(['team', 'season', 'region'])
export class TeamEloEntity extends EloEntity {
  @ManyToOne(() => TeamEntity, {
    nullable: false
  })
  public team: TeamEntity;
}
