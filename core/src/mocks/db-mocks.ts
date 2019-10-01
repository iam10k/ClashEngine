import { addMonths, endOfMonth, setDate, startOfMonth } from 'date-fns';
import * as faker from 'faker';
import { ConfigOptionEntity } from '../modules/config-option/entities';
import { GameEntity, GameOptionEntity } from '../modules/game/entities';
import { MatchTeamEntity } from '../modules/match-team/entities';
import { MatchEntity } from '../modules/match/entities';
import { MatchStatusType } from '../modules/match/enums/match-status.type';
import { MatchType } from '../modules/match/enums/match.type';
import { SeasonEntity, SeasonOptionEntity } from '../modules/season/entities';
import { UserDetailEntity } from '../modules/user/entities';

const options = {
  user: () => 50,
  games: () => 8,
  seasons: () => Math.round(Math.random() * 4) + 1,
  configOptions: () => 15,
  gameOptions: () => Math.round(Math.random() * 4) + 2,
  seasonOptions: () => Math.round(Math.random() * 4) + 2,
  matches: () => Math.round(Math.random() * 15) + 2,
  teams: () => 2
};

function generateEntities<T>(fn: (...params: any[]) => T, count: number, ...params: any[]): T[] {
  const list: T[] = [];
  for (let i = 0; i < count; i++) {
    list.push(fn(...params, i));
  }
  return list;
}

function generateEntitiesForEach<T>(objects: any[], fn: (...params: any[]) => T, count: () => number): T[] {
  const list: T[] = [];
  for (const obj of objects) {
    list.push(...generateEntities(fn, count(), obj));
  }
  return list;
}

function generateEntitiesForEachOf<T>(
  objects: any[],
  objects2: any[],
  fn: (...params: any[]) => T,
  count: () => number
): T[] {
  const list: T[] = [];
  let j = 0;
  for (const obj of objects) {
    for (let i = 0, total = count(); i < total; i++) {
      if (j + 1 === objects2.length) {
        j = 0;
      }
      list.push(...generateEntities(fn, 1, obj, objects2[j++]));
    }
  }
  return list;
}

function generateUser(index: number): UserDetailEntity {
  const user: UserDetailEntity = new UserDetailEntity();
  user.email = faker.internet.email();
  user.discordId = `${faker.random.number()}${index}`;
  user.username = faker.random.boolean() ? `${faker.internet.userName().slice(0, 20)}${index}` : undefined;
  if (index === 0) {
    user.username = null;
  } else if (index === 1) {
    user.username = 'taken';
  }
  user.registered = !!user.username;
  return user;
}

function generateGame(): GameEntity {
  const game: GameEntity = new GameEntity();
  game.name = faker.company.companyName();
  game.inactive = faker.random.boolean();
  game.image = faker.random.uuid() + '.png';
  return game;
}

function generateSeason(game: GameEntity, index?: number): SeasonEntity {
  const season: SeasonEntity = new SeasonEntity();
  season.startDate = startOfMonth(addMonths(setDate(new Date(), 15), index - 1));
  season.endDate = endOfMonth(addMonths(setDate(new Date(), 15), index - 1));
  const name = faker.commerce.color();
  season.name = name.charAt(0).toUpperCase() + name.slice(1) + ' Season';
  season.season = index + 1;
  season.game = game;
  return season;
}

function generateConfigOption(index?: number): ConfigOptionEntity {
  const configOpt: ConfigOptionEntity = new ConfigOptionEntity();
  configOpt.key = faker.hacker.abbreviation().slice(0, 8) + String(index);
  configOpt.description = faker.lorem.sentence();
  return configOpt;
}

function generateGameOption(game: GameEntity, configOpt: ConfigOptionEntity, index?: number): GameOptionEntity {
  const gameOpt: GameOptionEntity = new GameOptionEntity();
  gameOpt.game = game;
  gameOpt.configOption = configOpt;
  gameOpt.default = faker.random.boolean() ? String(faker.random.number()) : faker.random.word();
  gameOpt.required = faker.random.boolean();
  return gameOpt;
}

function generateSeasonOption(season: SeasonEntity, configOpt: ConfigOptionEntity, index?: number): SeasonOptionEntity {
  const seasonOpt: SeasonOptionEntity = new SeasonOptionEntity();
  seasonOpt.season = season;
  seasonOpt.configOption = configOpt;
  seasonOpt.value = faker.random.boolean() ? String(faker.random.number()) : faker.random.word();
  return seasonOpt;
}

function generateMatch(season: SeasonEntity, index?: number): MatchEntity {
  const match: MatchEntity = new MatchEntity();
  match.type = faker.random.arrayElement([MatchType.WAGER, MatchType.PICKUP, MatchType.SCRIM]);
  match.status = faker.random.arrayElement([
    MatchStatusType.PENDING,
    MatchStatusType.ACTIVE,
    MatchStatusType.ENDED,
    MatchStatusType.CANCELLED
  ]);
  match.season = season;
  return match;
}

function generateMatchTeam(match: MatchEntity, index?: number): MatchTeamEntity {
  const matchTeam: MatchTeamEntity = new MatchTeamEntity();
  matchTeam.match = match;
  matchTeam.score = faker.random.number();
  return matchTeam;
}

const entityMap: Map<any, any[]> = new Map();
entityMap.set(UserDetailEntity, generateEntities(generateUser, options.user()));
entityMap.set(GameEntity, generateEntities(generateGame, options.games()));
entityMap.set(SeasonEntity, generateEntitiesForEach(entityMap.get(GameEntity), generateSeason, options.seasons));
entityMap.set(ConfigOptionEntity, generateEntities(generateConfigOption, options.configOptions()));
entityMap.set(
  GameOptionEntity,
  generateEntitiesForEachOf(
    entityMap.get(GameEntity),
    entityMap.get(ConfigOptionEntity),
    generateGameOption,
    options.gameOptions
  )
);
entityMap.set(
  SeasonOptionEntity,
  generateEntitiesForEachOf(
    entityMap.get(GameEntity),
    entityMap.get(ConfigOptionEntity),
    generateSeasonOption,
    options.seasonOptions
  )
);
entityMap.set(MatchEntity, generateEntitiesForEach(entityMap.get(SeasonEntity), generateMatch, options.matches));
entityMap.set(MatchTeamEntity, generateEntitiesForEach(entityMap.get(MatchEntity), generateMatchTeam, options.teams));

export const ENTITIES = entityMap.values();
