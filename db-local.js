var Sequelize = require('sequelize');
const db_local={};
// const NoteModel = require('./src/models/persona')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
)

db_local.sequelize = sequelize;
db_local.Sequelize=Sequelize;

module.exports =db_local;
