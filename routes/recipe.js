// routes/recipes.js
const express = require('express');
const { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../db/recipeQueries');

const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.json({ recipes: recipes });
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await getRecipeById(id);
    if (recipe) {
      res.json({message: 'Recipe details by id', recipe: recipe});
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error retrieving recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST new recipe
router.post('/', async (req, res) => {
  const title = req.body.title;
  const making_time = req.body.making_time
  const serves = req.body.serves;
  const ingredients = req.body.ingredients;
  const cost = req.body.cost;
  console.log(req.body)
  try {
    const newRecipe = await createRecipe(title, making_time, serves, ingredients, cost);
    res.status(200).json({ message: 'Recipe successfully created!', recipe: newRecipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(200).json({ message: 'Recipe creation failed!', required: "title, making_time, serves, ingredients, cost" });
  }
});

// PATCH update recipe
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  const making_time = req.body.making_time
  const serves = req.body.serves;
  const ingredients = req.body.ingredients;
  const cost = req.body.cost;
  try {
    const updatedRecipe = await updateRecipe(id, title, making_time, serves, ingredients, cost);
    res.json({ message: 'Recipe successfully updated!', recipe: updatedRecipe });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE recipe
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRecipe(id);
    res.json({ message: 'Recipe successfully removed!' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'No recipe found' });
  }
});

module.exports = router;
