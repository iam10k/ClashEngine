import { MatchStatusType, MatchType } from '@clash/common';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreModifiableEntity } from '../../../core/entities';
import { MatchTeamEntity } from '../../match-team/entities';
import { RegionEntity } from '../../region/entities';
import { SeasonEntity } from '../../season/entities';

@Entity('match')
export class MatchEntity extends CoreModifiableEntity {
  @Column({
    type: 'enum',
    enum: MatchType,
    nullable: false
  })
  public type: MatchType;

  @ManyToOne(() => SeasonEntity)
  public season: SeasonEntity;

  @ManyToOne(() => RegionEntity)
  public region: RegionEntity;

  @RelationId((match: MatchEntity) => match.region)
  public regionKey: string;

  @RelationId((match: MatchEntity) => match.season)
  public seasonId: number;

  @Column({
    type: 'enum',
    enum: MatchStatusType,
    nullable: false,
    default: MatchStatusType.PENDING
  })
  public status: MatchStatusType;

  @Column({
    nullable: true
  })
  public winner: number;

  @OneToMany(() => MatchTeamEntity, matchTeam => matchTeam.match, {
    cascade: ['insert']
  })
  @JoinColumn()
  public teams: MatchTeamEntity[];
}
