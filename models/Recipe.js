const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

const Recipe = sequelize.define('recipe', {
  name: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  ingredients: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  image_url: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
});

module.exports = Recipe;