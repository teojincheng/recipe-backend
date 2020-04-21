const mongoose = require("mongoose");

const savedRecipeSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: "almur87",
  },
});

const SavedRecipe = mongoose.model("SavedRecipe", savedRecipeSchema);

module.exports = SavedRecipe;
