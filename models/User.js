const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  user_password: {
    type: DataTypes.STRING,
  },
});


module.exports = User;