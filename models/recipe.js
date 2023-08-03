// models/Recipe.js
class Recipe {
    constructor(id, title, making_time, serves, ingredients, cost) {
      this.id = id;
      this.title = title;
      this.making_time = making_time;
      this.serves = serves;
      this.ingredients = ingredients;
      this.cost = cost.toString();
    }
  }
  
  module.exports = Recipe;
  