const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('culinaryconnect', 'postgres', 'codepanda', {
  host: 'localhost',
  dialect: 'postgres',

});

module.exports = sequelize;