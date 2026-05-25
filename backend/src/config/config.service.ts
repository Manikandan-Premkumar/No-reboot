import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from '../entities/config.entity';
import { redis } from '../redis/redis';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private configRepository: Repository<Config>,
  ) {}

  
  private async clearCache() {
    try {
      
      const keys = await redis.keys('configs:*');
      if (keys.length > 0) {
        await redis.del(...keys);
        console.log('🧹 Redis configuration cache cleared');
      }
    } catch (error) {
      console.error('Failed to clear Redis cache:', error);
    }
  }

  async create(data: { key: string; value: any; description?: string }) {
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

    const savedConfig = await this.configRepository.save(config);
    await this.clearCache(); 
  }

  async findAll(scope?: string) {
    const cacheKey = `configs:${scope || 'all'}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log(' Serving configs from Redis Cache');
      return JSON.parse(cached);
    }

    const configs = await this.configRepository.find({
      where: scope ? { scope } : {},
    });

    await redis.set(cacheKey, JSON.stringify(configs), 'EX', 60);
    return configs;
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
    
    console.log(` Database updated: ${key} from ${oldValue} to ${data.value}`);
    
    await this.clearCache(); 
    
    return updated;
  }

  async delete(key: string) {
    const config = await this.findOne(key);
    const deleted = await this.configRepository.softDelete({ id: config.id });
    await this.clearCache(); 
    return deleted;
  }
}