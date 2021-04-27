require('dotenv').config();
const mysql = require('mysql');

const env = process.env;

const connection = mysql.createConnection ({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    connectionLimit: 10,
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
});