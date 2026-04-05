import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from '../entities/config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private configRepository: Repository<Config>,
  ) {}

  async create(data: { key: string; value: any; description?: string }) {
    // Check if config already exists
    const existing = await this.configRepository.findOne({
      where: { key: data.key },
    });

    if (existing) {
      throw new ConflictException(`Config "${data.key}" already exists`);
    }

    const config = this.configRepository.create({
      key: data.key,
      value: data.value,
      description: data.description || '',
      isActive: true,
    });
    return this.configRepository.save(config);
  }

  async findAll(scope?: string) {
    const where: any = { isActive: true };
    if (scope) {
      where.scope = scope;
    }
    return this.configRepository.find({ where });
  }

  async findOne(key: string) {
    const config = await this.configRepository.findOne({
      where: { key, isActive: true },
    });
    
    if (!config) {
      throw new NotFoundException(`Config "${key}" not found`);
    }
    
    return config;
  }

  async getValue(key: string): Promise<any> {
    const config = await this.findOne(key);
    return config.value;
  }

  async update(key: string, data: { value: any; changeReason?: string }) {
    const config = await this.configRepository.findOne({
      where: { key },
    });
    
    if (!config) {
      throw new NotFoundException(`Config "${key}" not found`);
    }
    
    const oldValue = config.value;
    config.value = data.value;
    const updated = await this.configRepository.save(config);
    
    // You can add version tracking here later
    console.log(`✅ Config updated: ${key} from ${oldValue} to ${data.value}`);
    
    return updated;
  }

  async delete(key: string) {
    const config = await this.findOne(key);
    return this.configRepository.softDelete({ id: config.id });
  }
}