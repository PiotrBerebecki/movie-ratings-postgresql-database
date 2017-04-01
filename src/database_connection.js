const { Pool } = require('pg');
const url = require('url');

require('env2')('config.env');

if (!process.env.DATABASE_URL) {
  throw new Error('Environment variable DATABASE_URL must be set');
}

const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');

const options = {
  user: username,
  password: password,
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

module.exports = new Pool(options);
