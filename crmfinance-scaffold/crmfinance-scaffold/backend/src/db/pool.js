const { Pool } = require('pg');

// Единое подключение к PostgreSQL на всё приложение.
// Строка подключения берётся из переменной окружения DATABASE_URL (см. .env.example).
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
