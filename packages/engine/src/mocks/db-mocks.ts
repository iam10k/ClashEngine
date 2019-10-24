import { MatchStatusType, MatchTeamMemberStatusType, MatchType } from '@clash/common';
import { addMonths, endOfMonth, setDate, startOfMonth } from 'date-fns';
import * as faker from 'faker';
import { ConfigOptionEntity } from '../modules/config-option/entities';
import { UserEloEntity } from '../modules/elo/entities';
import { GameEntity, GameOptionEntity } from '../modules/game/entities';
import { MatchTeamEntity, MatchTeamMemberEntity } from '../modules/match-team/entities';
import { MatchEntity } from '../modules/match/entities';
import { QueueEntity, QueuePlayerEntity } from '../modules/queue/entities';
import { RegionEntity } from '../modules/region/entities';
import { SeasonEntity, SeasonOptionEntity } from '../modules/season/entities';
import { UserDetailEntity, UserEntity } from '../modules/user/entities';
import { UserFlag } from '../modules/user/enums/user-flag';
import { UserRole } from '../modules/user/enums/user-role';
import { ISO_CODES } from './iso-codes';

const entityMap: Map<any, any[]> = new Map();

const options = {
  region: () => ISO_CODES,
  user: () => 100,
  games: () => 8,
  seasons: () => Math.round(Math.random() * 4) + 1,
  configOptions: () => 15,
  gameOptions: () => Math.round(Math.random() * 6) + 2,
  matches: () => Math.round(Math.random() * 6) + 2
};

function randomUnique<T>(fn: () => T, notValues: T[]): T {
  const value: T = fn();
  if (notValues.indexOf(value) !== -1) {
    return randomUnique<T>(fn, notValues);
  }
  return value;
}

function randomUniqueFromArray<T>(values: T[], notValues: T[]): T {
  return randomUnique<T>(() => values[Math.floor(Math.random() * values.length)], notValues);
}

function generateRegions(): void {
  entityMap.set(
    RegionEntity,
    ISO_CODES.map(iso => {
      const region: RegionEntity = new RegionEntity();
      region.enabled = faker.random.boolean();
      region.key = iso['alpha-2'];
      region.iso2 = iso['alpha-2'];
      region.name = iso.name;
      return region;
    })
  );
}

function generateUsers(): void {
  const count = options.user();
  const userNames: string[] = [];
  const users: UserDetailEntity[] = [];

  for (let i = 0; i < count; i++) {
    const username: string = randomUnique<string>(faker.internet.userName, userNames);
    const user: UserDetailEntity = new UserDetailEntity();
    user.id = i;
    user.email = faker.internet.email();
    user.discordId = `${Number.MAX_SAFE_INTEGER - Math.pow(i, 4)}`;
    user.username = faker.random.boolean() ? username.slice(0, 20) : undefined;
    if (i === 0) {
      user.username = null;
    } else if (i === 1) {
      user.username = 'taken';
    }
    user.registered = !!user.username;
    user.roles =
      Math.random() > 0.8 ? faker.random.arrayElement([UserRole.BETA_TESTER, UserRole.SUPPORT, UserRole.ADMIN]) : null;
    user.flags = Math.random() > 0.8 ? faker.random.arrayElement([UserFlag.EARLY_ADOPTER, UserFlag.PREMIUM]) : null;
    users.push(user);
    userNames.push(username);
  }

  entityMap.set(UserDetailEntity, users);
}

function generateConfigOptions(): void {
  const count = options.configOptions();
  const configOptionKeys: string[] = [];
  const configOptions: ConfigOptionEntity[] = [];

  for (let i = 0; i < count; i++) {
    const configOptionKey: string = randomUnique<string>(
      () => `${faker.hacker.abbreviation()}_${faker.hacker.noun()}`.toUpperCase().slice(0, 10),
      configOptionKeys
    );
    const configOpt: ConfigOptionEntity = new ConfigOptionEntity();
    configOpt.key = configOptionKey;
    configOpt.description = faker.lorem.sentence();
    configOptions.push(configOpt);
    configOptionKeys.push(configOptionKey);
  }

  entityMap.set(ConfigOptionEntity, configOptions);
}

function generateGames(): void {
  const count = options.games();
  const gameNames: string[] = [];
  const games: GameEntity[] = [];

  for (let i = 0; i < count; i++) {
    const gameName: string = randomUnique<string>(faker.company.companyName, gameNames);
    const game: GameEntity = new GameEntity();
    game.id = i;
    game.name = gameName;
    game.inactive = faker.random.boolean();
    game.image = faker.random.uuid() + '.png';
    game.teamCount = Math.random() * 5 > 1 ? 2 : 3;
    game.teamPlayers = Math.round(Math.random() * 6) + 1;
    games.push(game);
    gameNames.push(gameName);
  }

  entityMap.set(GameEntity, games);
}

function generateQueues(): void {
  let id: number = 0;
  const queues: QueueEntity[] = [];

  entityMap.get(GameEntity).forEach(game => {
    entityMap.get(RegionEntity).forEach(region => {
      const queue: QueueEntity = new QueueEntity();
      queue.id = id++;
      queue.region = region;
      queue.game = game;
      queue.enabled = game.id < 3 ? true : faker.random.boolean();
      queues.push(queue);
    });
  });

  entityMap.set(QueueEntity, queues);
}

function generateSeasons(): void {
  let id: number = 0;
  const seasons: SeasonEntity[] = [];

  entityMap.get(GameEntity).forEach((game: GameEntity) => {
    const count = options.seasons();
    const seasonNames: string[] = [];

    for (let i = count; i > 0; i--) {
      const season: SeasonEntity = new SeasonEntity();
      const seasonName: string = randomUnique<string>(faker.commerce.color, seasonNames);
      season.id = id++;
      season.name = seasonName.charAt(0).toUpperCase() + seasonName.slice(1) + ' Season';
      season.startDate = startOfMonth(addMonths(setDate(new Date(), 15), i - (count - 1)));
      season.endDate = endOfMonth(addMonths(setDate(new Date(), 15), i - (count - 1)));
      season.season = i;
      season.game = game;
      seasons.push(season);
      seasonNames.push(seasonName);
    }
  });

  entityMap.set(SeasonEntity, seasons);
}

function generateGameOptions(): void {
  const gameOptions: GameOptionEntity[] = [];

  entityMap.get(GameEntity).forEach(game => {
    const count = options.gameOptions();
    const configOptions: ConfigOptionEntity[] = [];

    for (let i = count; i > 0; i--) {
      const gameOpt: GameOptionEntity = new GameOptionEntity();
      const configOption: ConfigOptionEntity = randomUniqueFromArray(entityMap.get(ConfigOptionEntity), configOptions);
      gameOpt.game = game;
      gameOpt.configOption = configOption;
      gameOpt.default = faker.random.boolean() ? String(faker.random.number()) : faker.random.word();
      gameOpt.required = faker.random.boolean();
      gameOptions.push(gameOpt);
      configOptions.push(configOption);
    }
  });

  entityMap.set(GameOptionEntity, gameOptions);
}

function generateSeasonOptions(): void {
  const seasonOptions: SeasonOptionEntity[] = [];

  entityMap.get(SeasonEntity).forEach((season: SeasonEntity) => {
    const gameOptions: GameOptionEntity[] = entityMap
      .get(GameOptionEntity)
      .filter((gameOption: GameOptionEntity) => gameOption.game.id === season.game.id);

    gameOptions.forEach((gameOption: GameOptionEntity) => {
      const seasonOpt: SeasonOptionEntity = new SeasonOptionEntity();
      seasonOpt.season = season;
      seasonOpt.configOption = gameOption.configOption;
      if (gameOption.required || Math.random() > 0.5) {
        seasonOpt.value = faker.random.boolean() ? String(faker.random.number()) : faker.random.word();
        seasonOptions.push(seasonOpt);
      }
    });
  });

  entityMap.set(SeasonOptionEntity, seasonOptions);
}

function generateMatches(): void {
  let id: number = 0;
  const regions: RegionEntity[] = entityMap.get(RegionEntity);
  const matches: MatchEntity[] = [];

  entityMap.get(SeasonEntity).forEach(season => {
    const count = options.matches();
    for (let i = count; i > 0; i--) {
      if (season.startDate > new Date()) {
        continue;
      }
      const match: MatchEntity = new MatchEntity();
      match.id = id++;
      match.type = faker.random.arrayElement([MatchType.WAGER, MatchType.PICKUP, MatchType.SCRIM]);
      match.status = faker.random.arrayElement([
        MatchStatusType.PENDING,
        MatchStatusType.ACTIVE,
        MatchStatusType.ENDED,
        MatchStatusType.CANCELLED
      ]);
      match.region = regions[Math.floor(Math.random() * regions.length)];
      match.season = season;
      matches.push(match);
    }
  });
  entityMap.set(MatchEntity, matches);
}

function generateMatchTeams(): void {
  let id: number = 0;
  const matchTeams: MatchTeamEntity[] = [];

  entityMap.get(MatchEntity).forEach(match => {
    const count = match.season.game.teamCount;

    for (let i = count; i > 0; i--) {
      const matchTeam: MatchTeamEntity = new MatchTeamEntity();
      matchTeam.id = id++;
      matchTeam.match = match;
      matchTeam.elo = Number((Math.random() * 1500 + 500).toFixed(3));
      matchTeam.adjustedElo = Number((matchTeam.elo + Math.random() * 800).toFixed(3));
      matchTeam.score = faker.random.number();
      matchTeams.push(matchTeam);
    }
  });
  entityMap.set(MatchTeamEntity, matchTeams);
}

function generateMatchTeamPlayers(): void {
  let id: number = 0;
  const matchTeamMembers: MatchTeamMemberEntity[] = [];
  const membersPerMatch: Map<number, UserDetailEntity[]> = new Map();

  entityMap.get(MatchTeamEntity).forEach((matchTeam: MatchTeamEntity) => {
    const count = matchTeam.match.season.game.teamPlayers;

    for (let i = count; i > 0; i--) {
      if (!membersPerMatch.has(matchTeam.match.id)) {
        membersPerMatch.set(matchTeam.match.id, []);
      }
      const matchUsers: UserDetailEntity[] = membersPerMatch.get(matchTeam.match.id) || [];
      const user: UserDetailEntity = randomUniqueFromArray(entityMap.get(UserDetailEntity), matchUsers);
      const matchTeamMember: MatchTeamMemberEntity = new MatchTeamMemberEntity();
      matchTeamMember.id = id++;
      matchTeamMember.team = matchTeam;
      matchTeamMember.user = user;
      matchTeamMember.status = faker.random.arrayElement([
        MatchTeamMemberStatusType.PENDING,
        MatchTeamMemberStatusType.APPROVED,
        MatchTeamMemberStatusType.DECLINED,
        MatchTeamMemberStatusType.LEAVER
      ]);
      matchTeamMembers.push(matchTeamMember);
      matchUsers.push(user);
    }
  });
  entityMap.set(MatchTeamMemberEntity, matchTeamMembers);
}

function generateUserElos(): void {
  let id: number = 0;
  const userElos: UserEloEntity[] = [];

  entityMap.get(UserDetailEntity).forEach(user => {
    const userRegionSeason: Map<string, number[]> = new Map();

    entityMap.get(MatchTeamMemberEntity).forEach((teamMember: MatchTeamMemberEntity) => {
      if (teamMember.user.id === user.id) {
        if (!userRegionSeason.has(teamMember.team.match.region.key)) {
          userRegionSeason.set(teamMember.team.match.region.key, []);
        }
        const regionSeason: number[] = userRegionSeason.get(teamMember.team.match.region.key);

        if (!regionSeason.includes(teamMember.team.match.season.id)) {
          const userElo: UserEloEntity = new UserEloEntity();
          userElo.id = id++;
          userElo.user = user;
          userElo.elo = Number((Math.random() * 1500 + 500).toFixed(3));
          userElo.region = teamMember.team.match.region;
          userElo.season = teamMember.team.match.season;
          regionSeason.push(teamMember.team.match.season.id);
          userElos.push(userElo);
        }
      }
    });
  });

  entityMap.set(UserEloEntity, userElos);
}

function generateQueuePlayers(): void {
  let id: number = 0;
  const queuePlayers: QueuePlayerEntity[] = [];
  const playerIds: number[] = [];

  entityMap.get(QueueEntity).forEach((queue: QueueEntity) => {
    if (queue.enabled) {
      entityMap.get(UserEloEntity).forEach((userElo: UserEloEntity) => {
        if (!playerIds.includes(userElo.user.id)) {
          if (Math.random() > 0.5) {
            const queuePlayer: QueuePlayerEntity = new QueuePlayerEntity();
            queuePlayer.id = id++;
            queuePlayer.queue = queue;
            queuePlayer.user = userElo.user as UserEntity;
            queuePlayer.elo = userElo;
            queuePlayers.push(queuePlayer);
          }
          playerIds.push(userElo.user.id);
        }
      });
    }
  });

  entityMap.set(QueuePlayerEntity, queuePlayers);
}

generateRegions();
generateUsers();
generateConfigOptions();
generateGames();
generateQueues();
generateGameOptions();
generateSeasons();
generateSeasonOptions();
generateMatches();
generateMatchTeams();
generateMatchTeamPlayers();
generateUserElos();
generateQueuePlayers();

export const ENTITIES = entityMap.values();
