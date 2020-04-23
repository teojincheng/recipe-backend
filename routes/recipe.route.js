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
  const recipesData = await Recipe.find({}, "-__v").sort({ createdAt: -1 });
  return recipesData;
};

const getRecipesAccordingToSort = async (sortType) => {
  let recipesData;
  switch (sortType) {
    case "oldest":
      recipesData = await Recipe.find({}, "-__v").sort({ createdAt: 1 });
      return recipesData;
    case "name-descend":
      recipesData = await Recipe.find({}, "-__v").sort({ name: -1 });
      return recipesData;

    case "name-ascend":
      recipesData = await Recipe.find({}, "-__v").sort({ name: 1 });
      return recipesData;
  }
};

const getRecipesBySearchTerm = async (searchTerm) => {
  const regex = new RegExp(searchTerm, "gi");
  const correctRecipes = await Recipe.find({
    $or: [{ name: regex }, { ingredients: regex }],
  });
  return correctRecipes;
};

const getRecipeById = async (id) => {
  const recipeDoc = await Recipe.findById(id);
  return recipeDoc;
};

router.get("/", async (req, res) => {
  if (req.query.searchTerm) {
    const recipes = await getRecipesBySearchTerm(req.query.searchTerm);
    res.status(200).send(recipes);
  } else if (req.query.sortType) {
    const recipes = await getRecipesAccordingToSort(req.query.sortType);
    res.status(200).send(recipes);
  } else {
    const collection = await getAllRecipeData();
    res.status(200).send(collection);
  }
});

router.get("/:recipeId", async (req, res) => {
  const recipe = await getRecipeById(req.params.recipeId);
  res.status(200).send(recipe);
});

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
