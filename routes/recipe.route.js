const express = require("express");
const router = express.Router();

const Recipe = require("../models/recipe.model");

const createRecipeItem = async (recipeData) => {
  await Recipe.init();
  const recipeDoc = Recipe(recipeData);
  let id = await recipeDoc.save(function (err, recipe) {
    return recipe._id;
  });
  return id;
};

const getAllRecipeData = async () => {
  const recipesData = await Recipe.find({}, "-__v");
  return recipesData;
};

const getRecipeById = async () => {};

router.get("/", async (req, res) => {
  const collection = await getAllRecipeData();
  res.status(200).send(collection);
});

router.get("/:recipeId", async (req, res) => {});

router.get("/numberOfRecords", async (req, res) => {
  const collection = await getAllRecipeData();
  const countOfRecords = collection.length;
  res.status(200).json(countOfRecords);
});

router.post("/", async (req, res, next) => {
  try {
    await Recipe.init();
    const recipeDoc = Recipe(req.body);
    recipeDoc.save(function (err, recipe) {
      res.status(201).json(recipe._id);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
