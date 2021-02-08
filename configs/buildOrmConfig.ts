import { TypeOrmModuleOptions } from '@nestjs/typeorm';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { writeFileSync } = require('fs');
const { join } = require('path');

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env['DATABASE_URL'],
  port: parseInt(process.env['DATABASE_PORT']),
  username: process.env['DATABASE_USERNAME'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
  entities: [join('dist', '**', 'entities', '*.entity.{ts,js}')],
  migrations: [join('dist', '**', 'migrations', '*.migration.{ts,js}')],
  cli: {
    migrationsDir: join('src', 'database', 'migrations'),
  },
  synchronize: false,
};

writeFileSync('ormconfig.json', JSON.stringify(ormConfig, null, 2));
