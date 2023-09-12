const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { where } = require('sequelize');

// create a recipe
router.post('/', (req, res) => {
  const { name, title, ingredients, description, image_url, username } = req.body;
  Recipe.create({
    name,
    title,
    ingredients,
    description,
    image_url,
    username
  })
    .then(recipe => {
      res.json({
        message: 'Recipe created successfully',
        recipe: recipe
      });
    })
    .catch(err => { console.error(err); });
});

//get all recipes
router.get("/", (req, res) => {
  Recipe.findAll()
    .then((recipes) => {
      // console.log(recipes);
      res.json(recipes);
    })
    .catch((err) => { console.error(err) });
});

//get a recipe
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Recipe.findOne({ where: { id: id } })
    .then((recipe) => {
      if (!recipe) return res.status(404)
        .send({
          message: "Recipe not found"
        });
      // console.log(recipe);
      res.json(recipe);
    })
    .catch((err) => { console.error(err) });

});

//update a recipe
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, title, ingredients, description, image_url, username } = req.body;

  const recipe = await Recipe.findOne({ where: { id: id } });
  if (!recipe) return res.status(404).send('Recipe not found...');

  Recipe.update(
    {
      name: name,
      title: title,
      ingredients: ingredients,
      description: description,
      image_url: image_url,
      username: username
    }, {
    where: {
      id: id
    }
  }).then(() => res.json('Recipe updated...'))
    .catch(err => res.json(err))
});

//delete a recipe
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const recipe = await Recipe.findOne({ where: { id: id } });
  if (!recipe) return res.status(404).send('Recipe not found...');

  Recipe.destroy({
    where: {
      id: id,
    }
  }).then(() => res.json('Recipe deleted...'))
    .catch(err => res.json(err))
});


module.exports = router;