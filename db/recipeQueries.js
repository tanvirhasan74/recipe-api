// db/recipeQueries.js
const pool = require('../db/db');
const moment = require('moment');
const Recipe = require('../models/recipe');
const CreateRecipeResponse = require('../models/createRecipeResponse');
const UpdateRecipeResponse = require('../models/updateRecipeResponse');


// GET all recipes
const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM recipes', (error, results) => {
      if (error) {
        reject(error);
      } else {
        const recipes = results.map((row) => new Recipe(row.id, row.title, row.making_time, row.serves, row.ingredients, row.cost));
        resolve(recipes);
      }
    });
  });
};

// GET recipe by ID
const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM recipes WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const recipe = results.map((row) => new Recipe(row.id, row.title, row.making_time, row.serves, row.ingredients, row.cost));
        resolve(recipe);
      }
    });
  });
};

// GET recipe by ID
const getSpecificRecipe = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM recipes WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const recipe = results.map((row) => new CreateRecipeResponse(
          row.id, 
          row.title, 
          row.making_time, 
          row.serves, 
          row.ingredients, 
          row.cost,
          moment(row.created_at).format('YYYY-MM-DD HH:mm:ss'),
          moment(row.updated_at).format('YYYY-MM-DD HH:mm:ss')
          ));
        resolve(recipe);
      }
    });
  });
};

// POST new recipe
const createRecipe = (title, making_time, serves, ingredients, cost) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO recipes (title, making_time, serves, ingredients, cost, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [title, making_time, serves, ingredients, cost ],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const insertedId = results.insertId;
          const insertedRecipe = getSpecificRecipe(insertedId);
          resolve(insertedRecipe);        
        }
      }
    );
  });
};

// PUT update recipe
const updateRecipe = (id, title, making_time, serves, ingredients, cost) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE recipes SET title = ?, making_time = ?, serves = ?, ingredients = ?, cost = ?, updated_at = NOW() WHERE id = ?',
      [title, making_time, serves, ingredients, cost, id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
            getRecipeById(id)
            .then((row) => {
              const updatedRecipe = new UpdateRecipeResponse(
                row[0].title,
                row[0].making_time,
                row[0].serves,
                row[0].ingredients,
                row[0].cost
              );
              resolve(updatedRecipe);
            })
            .catch((error) => {
              reject(error);
            }); 
          
        }
      }
    );
  });
};

// DELETE recipe
const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM recipes WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
