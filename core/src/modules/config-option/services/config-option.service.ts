import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { ConfigOptionCreate } from '../dtos/config-option-create.dto';
import { ConfigOptionUpdate } from '../dtos/config-option-update.dto';
import { ConfigOption } from '../dtos/config-option.dto';
import { ConfigOptionEntity } from '../entities';

@Injectable()
export class ConfigOptionService {
  constructor(
    @InjectRepository(ConfigOptionEntity) private readonly optionRepository: Repository<ConfigOptionEntity>
  ) {}

  async findConfigOptions(): Promise<ConfigOption[]> {
    const optionEntities: ConfigOptionEntity[] = await this.optionRepository.find();
    return optionEntities.map(optionEntity =>
      plainToClass(ConfigOption, optionEntity, { excludeExtraneousValues: true })
    );
  }

  async addConfigOption(optionCreate: ConfigOptionCreate): Promise<ConfigOption> {
    const optionEntity: ConfigOptionEntity = await this.optionRepository.save({ ...optionCreate });
    return plainToClass(ConfigOption, optionEntity, { excludeExtraneousValues: true });
  }

  async updateConfigOption(key: string, optionUpdate: ConfigOptionUpdate): Promise<ConfigOption> {
    const optionEntity: ConfigOptionEntity = await this.optionRepository.save({ ...optionUpdate, key });
    return plainToClass(ConfigOption, optionEntity, { excludeExtraneousValues: true });
  }
}
