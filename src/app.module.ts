import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigModule as AppConfigModule } from './config/config.module';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AppConfigModule,
    AuthModule,
  ],
  // No controllers array here - they are in ConfigModule
})
export class AppModule {}