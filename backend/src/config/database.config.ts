import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Ensure it is set (e.g. via a Railway reference variable).`,
    );
  }
  return value;
}

export function getDatabaseConfig(): TypeOrmModuleOptions {
  const host = requireEnv('DB_HOST', 'localhost');
  const port = parseInt(requireEnv('DB_PORT', '5432'), 10);
  const username = requireEnv('DB_USERNAME', 'postgres');
  const password = requireEnv('DB_PASSWORD');
  const database = requireEnv('DB_NAME', 'postgres');

  if (isNaN(port) || port <= 0 || port > 65535) {
    throw new Error(
      `Invalid DB_PORT value "${process.env.DB_PORT}": must be a number between 1 and 65535.`,
    );
  }

  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    autoLoadEntities: true,
    synchronize: true,
  };
}
