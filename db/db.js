const pg = require("pg");

const client = new pg.Client({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect((err) => {
  if (err) throw err;
});

module.exports = { pg, client };