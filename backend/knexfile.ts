import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'user',
    password: '23C$NlGh9i^k',
    database: 'challenge',
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

export default config;