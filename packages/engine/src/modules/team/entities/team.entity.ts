import { Column, Entity, OneToMany } from 'typeorm';
import { CoreModifiableEntity } from '../../../core/entities';
import { TournamentTeamEntity } from '../../tournament/entities';
import { TeamMemberEntity } from './team-member.entity';

@Entity('team')
export class TeamEntity extends CoreModifiableEntity {
  @Column({
    unique: true,
    length: 32
  })
  public name: string;

  @OneToMany(() => TeamMemberEntity, teamMember => teamMember.team)
  public members: TeamMemberEntity[];

  @OneToMany(() => TournamentTeamEntity, tournamentTeam => tournamentTeam.team)
  public tournaments: TournamentTeamEntity[];
}
