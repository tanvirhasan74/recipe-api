class CreateRecipeResponse {
    constructor(id, title, making_time, serves, ingredients, cost, created_at, updated_at) {
      this.id = id.toString();
      this.title = title;
      this.making_time = making_time;
      this.serves = serves;
      this.ingredients = ingredients;
      this.cost = cost.toString();
      this.created_at = created_at;
      this.updated_at = updated_at
    }
  }
  module.exports =  CreateRecipeResponse;
