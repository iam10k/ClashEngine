import { Column, Entity, ManyToOne, OneToMany, OneToOne, RelationId } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { MatchTeamEntity } from '../../match-team/entities';
import { SeasonEntity } from '../../season/entities';
import { MatchStatusType } from '../enums/match-status.type';
import { MatchType } from '../enums/match.type';

@Entity('match')
export class MatchEntity extends CoreDataEntity {
  @Column({
    type: 'enum',
    enum: MatchType,
    nullable: false
  })
  public type: MatchType;

  @ManyToOne(() => SeasonEntity)
  public season: SeasonEntity;

  @RelationId((match: MatchEntity) => match.season)
  public seasonId: number;

  @Column({
    type: 'enum',
    enum: MatchStatusType,
    nullable: false,
    default: MatchStatusType.PENDING
  })
  public status: MatchStatusType;

  @OneToOne(() => MatchTeamEntity, {
    nullable: true
  })
  public winner: MatchTeamEntity;

  @RelationId((match: MatchEntity) => match.winner)
  public winnerId: number;

  @OneToMany(() => MatchTeamEntity, matchTeam => matchTeam.match, {
    cascade: ['insert']
  })
  public teams: MatchTeamEntity[];
}
