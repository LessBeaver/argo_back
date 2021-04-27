require('dotenv').config();
const mysql = require('mysql');

const env = process.env;

const config = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    // connectionLimit: 10,
}

const connection = mysql.createPool(config);

module.exports = connection;