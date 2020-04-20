const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    cookingTime: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    cookingMethod: {
      type: String,
    },
    savedCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
