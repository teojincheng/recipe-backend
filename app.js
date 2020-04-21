const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:3001"],
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).send("Recipe backend");
});

const recipeRouter = require("./routes/recipe.route");
const savedRecipeRouter = require("./routes/savedRecipe.route");
app.use("/recipes", recipeRouter);
app.use("/saved-recipes", savedRecipeRouter);

module.exports = app;
