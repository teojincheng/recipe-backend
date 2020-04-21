const express = require("express");
const router = express.Router();

const SavedRecipe = require("../models/savedRecipe.model");

const getAllSavedRecipe = async () => {
  const recipesData = await SavedRecipe.find({}, "-__v");
  return recipesData;
};

const getSavedRecipeByUser = async (identify) => {};

const saveOneRecipe = async (saveData) => {
  await SavedRecipe.init();
  const doc = Recipe(saveData);
  await doc.save();
};

router.get("/", async (req, res, next) => {
  const collection = await getAllSavedRecipe();
  res.status(200).send(collection);
});

router.post("/", async (req, res, next) => {
  try {
    await saveOneRecipe(req.body);
    res.status(201).send(req.body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
