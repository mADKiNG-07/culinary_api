// const { DataTypes } = require('sequelize');
// const sequelize = require('../db/seq');
const mongoose = require('mongoose');


// const Recipe = sequelize.define('recipe', {

// });

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;