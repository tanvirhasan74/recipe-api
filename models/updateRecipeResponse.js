class UpdateRecipeResponse {
    constructor(title, making_time, serves, ingredients, cost) {
      this.title = title;
      this.making_time = making_time;
      this.serves = serves;
      this.ingredients = ingredients;
      this.cost = cost.toString()
    }
  }
  

  module.exports =  UpdateRecipeResponse;
