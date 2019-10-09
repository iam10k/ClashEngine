import { GameOption, GameOptionUpdate } from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { FindConditions, Repository } from 'typeorm';
import { GameOptionEntity } from '../entities';

@Injectable()
export class GameOptionService {
  constructor(@InjectRepository(GameOptionEntity) private readonly optionRepository: Repository<GameOptionEntity>) {}

  async findGameOptions(gameId: number): Promise<GameOption[]> {
    const optionEntities: GameOptionEntity[] = await this.optionRepository.find({
      relations: ['configOption'],
      where: {
        game: gameId
      }
    });
    return plainToClass(GameOption, optionEntities, { excludeExtraneousValues: true });
  }

  async updateGameOption(gameId: number, key: string, optionUpdate: GameOptionUpdate): Promise<GameOption> {
    const optionEntity: GameOptionEntity = await this.optionRepository.save({
      ...optionUpdate,
      configOption: { key },
      game: { id: gameId }
    });
    return plainToClass(GameOption, optionEntity, { excludeExtraneousValues: true });
  }

  async deleteGameOption(gameId: number, key: string): Promise<void> {
    await this.optionRepository.delete({
      where: {
        game: gameId,
        configOption: key
      }
    } as FindConditions<GameOptionEntity>);
  }
}
