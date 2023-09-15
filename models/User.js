// const { DataTypes } = require('sequelize');
// const sequelize = require('../db/seq');

const mongoose = require('mongoose');

// const User = sequelize.define('users', {

// });

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  user_password: {
    type: String,
    required: true
  },
})

const User = mongoose.model('User', userschema);
module.exports = User;