import { Game, GameCreate, GameFindOptions, GamePagedResponse, GameUpdate, Season } from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { SqlUtil } from '../../../utils';
import { GameEntity } from '../entities';

@Injectable()
export class GameService {
  constructor(@InjectRepository(GameEntity) private readonly gameRepository: Repository<GameEntity>) {}

  async findGames(findOptions: GameFindOptions): Promise<GamePagedResponse> {
    const query = this.gameRepository.createQueryBuilder('game');

    let hasWhere: boolean = false;
    if (findOptions.q) {
      hasWhere = SqlUtil.addWhere(query, hasWhere, 'LOWER(game.name) LIKE :text', {
        text: `%${findOptions.q.toLowerCase()}%`
      });
    }
    if (!findOptions.includeInactive) {
      SqlUtil.addWhere(query, hasWhere, 'game.inactive = false');
    }

    const [gameEntities, count]: [GameEntity[], number] = await query
      .leftJoinAndSelect('game.seasons', 'season', 'season.startDate <= now() AND season.endDate >= now()')
      .skip(findOptions.skip)
      .take(findOptions.take)
      .orderBy('game.name', findOptions.order)
      .getManyAndCount();

    const games: Game[] = gameEntities.map(gameEntity => {
      const seasons: Season[] = gameEntity.seasons.map(seasonEntity => {
        return plainToClass(Season, seasonEntity, { excludeExtraneousValues: true });
      });
      const game = { ...gameEntity, seasons };
      return plainToClass(Game, game, { excludeExtraneousValues: true });
    });

    return new GamePagedResponse(games, count, findOptions);
  }

  async addGame(gameCreate: GameCreate): Promise<Game> {
    const gameEntity: GameEntity = await this.gameRepository.save({
      ...gameCreate
    });
    return plainToClass(Game, gameEntity, { excludeExtraneousValues: true });
  }

  async updateGame(gameId: number, gameUpdate: GameUpdate): Promise<Game> {
    const gameEntity: GameEntity = await this.gameRepository.save({
      ...gameUpdate,
      id: gameId
    });
    return plainToClass(Game, gameEntity, { excludeExtraneousValues: true });
  }
}
