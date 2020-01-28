'use strict';

module.exports = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    storage: "./db.development.sqlite",
    enableSequelizeLog: (process.env.DB_LOG === 'true') ? true:false,
    ssl: process.env.DB_SSL,
    sync: (process.env.DB_SYNC === 'true') ? true:false,
};
