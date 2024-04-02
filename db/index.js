const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'fifatest'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};