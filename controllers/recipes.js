const Recipe = require('../models/recipe')

exports.saveNewRecipe = function (req, res, next) {
  const name = req.body.name;
  const picture = req.file;
  const ingredients = JSON.parse(req.body.ingredients);
  const cookingSteps = req.body.cookingSteps;

  const recipe = new Recipe({
    name: name,
    ingredients: ingredients,
    cookingSteps: cookingSteps,
    picture: {
      data: picture.buffer,
      contentType: picture.mimetype
    }
  });

  recipe.save(function (err, savedRecipe) {
    if (err) { return next(err) }

    res.json({ state: "Recipe saved", id: savedRecipe._id });
  })
}

exports.saveUpdatedRecipe = function (req, res, next) {
  const id = req.body.id
  const name = req.body.name;
  const ingredients = JSON.parse(req.body.ingredients);
  const cookingSteps = JSON.parse(req.body.cookingSteps);
  const picture = req.file;

  console.log("LOG STEPS:" + cookingSteps)

  Recipe.findById(id, function (err, existingRecipe) {
    if (err) { return next(err) }

    if (picture !== undefined) {
      existingRecipe.picture = {
        data: picture.buffer,
        contentType: picture.mimetype
      }
    }
    existingRecipe.name = name
    existingRecipe.ingredients = ingredients
    existingRecipe.cookingSteps = cookingSteps
    existingRecipe.save(function (err, savedRecipe) {
      if (err) { return next(err) }

      res.json({ state: "Recipe Updated", id: savedRecipe._id });
    })

  })
}

exports.getAllRecipes = function (req, res, next) {
  Recipe.find(function (err, recipes) {
    if (err) { return next(err) }

    res.json({ success: recipes })
  })
}

exports.getAllRecipesShortInfo = function (req, res, next) {
  Recipe.find()
    .limit(10)
    .select({ _id: 1, name: 1, picture: 1, tags: 1 })
    .exec(function (err, recipes) {
      if (err) { return next(err) }

      res.json({ success: recipes })
    });
}

exports.getRecipeById = function (req, res, next) {
  var id = req.query.id;
  console.log("ID: " + id)
  Recipe.findById(id, function (err, recipe) {
    if (err) { return next(err) }

    res.json({ success: recipe })
  })
} 
