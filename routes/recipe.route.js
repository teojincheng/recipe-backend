const express = require("express");
const router = express.Router();

const Recipe = require("../models/recipe.model");

const createRecipeItem = async (recipeData) => {
  await Recipe.init();
  const recipeDoc = Recipe(recipeData);
  await recipeDoc.save();
};

const getAllRecipeData = async () => {
  const recipesData = await Recipe.find({}, "-_id");
  return recipesData;
};

router.get("/", async (req, res) => {
  const collection = await getAllRecipeData();
  res.status(200).send(collection);
});

router.post("/", async (req, res, next) => {
  try {
    await createRecipeItem(req.body);
    res.status(201).send(req.body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
