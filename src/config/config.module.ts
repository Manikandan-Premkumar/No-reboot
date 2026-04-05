import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { Config } from '../entities/config.entity';
import { ConfigVersion } from '../entities/config-version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Config, ConfigVersion])],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}