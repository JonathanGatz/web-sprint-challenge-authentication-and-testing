const knex = require('knex');
const knexConfig = require('../knexfile.js');
//const environment = process.env.NODE_ENV || 'development';
const dbEnv = process.env.DB_ENV || 'development'


module.exports = knex(knexConfig[dbEnv]);


