require('dotenv').config()
const { Sequelize } = require('sequelize');


const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    pool: {
        max: 5, // Maximum number of connection in the pool
        min: 0, // Minimum number of connection in the pool
        acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released
        idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
    },
});

module.exports = { sequelize };