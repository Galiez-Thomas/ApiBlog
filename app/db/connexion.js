const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'api2',
  password: '',
  port: 4321,
})

module.exports = pool;
