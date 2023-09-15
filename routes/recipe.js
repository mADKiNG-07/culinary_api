const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { where } = require('sequelize');

// create a recipe
router.post('/', (req, res) => {
  const { name, title, ingredients, description, image_url, username } = req.body;

  const recipe = new Recipe({
    name: name,
    ingredients: ingredients,
    description: description,
    image_url: image_url,
    username: username,
  });

  recipe.save()
    .then((result) => {
      res.status(201).send({
        message: "Recipe added successfully",
        recipe: result.name,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

});

//get all recipes
router.get("/", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      // console.log(recipes);
      res.json(recipes);
    })
    .catch((err) => { console.error(err) });
});

//get a recipe
router.get("/:id", (req, res) => {
  const id = req.params._id;
  Recipe.findOne({ id: id })
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

  Recipe.findByIdAndUpdate(
    id,
    { ...req.body, updatedAt: Date.now() },
    { useFindAndmodify: false }
  ).then((result) => res.json({
    message: 'Update Successfully',
  }))
    .catch(err => res.json({ message: err.message }))
});

//delete a recipe
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  Recipe.findByIdAndDelete(
    id, { useFindAndmodify: false })
    .then(() => res.json('Recipe deleted...'))
    .catch(err => res.json(err))
});


module.exports = router;