import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities';
import { TeamEntity } from './team.entity';

@Entity('team_member')
export class TeamMemberEntity {
  @ManyToOne(() => TeamEntity, team => team.members, {
    primary: true,
    nullable: false
  })
  @JoinColumn()
  public team: TeamEntity;

  @ManyToOne(() => UserEntity, user => user.teams, {
    primary: true,
    nullable: false
  })
  @JoinColumn()
  public user: UserEntity;

  @Column({
    default: false
  })
  public captain: boolean;
}
