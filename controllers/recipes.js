const Recipe = require('../models/recipe')

exports.saveNewRecipe = function (req, res, next) {
  const name = req.body.name;
  const ingredients = req.body.ingredients

  const recipe = new Recipe({
    name: name,
    ingredients: ingredients
  });

  recipe.save(function (err) {
    if (err) { return next(err) }
    res.json({ success: "New Recepie saved" });
  })

}

exports.saveUpdatedRecipe = function (req, res, next) {
  const id = req.body.id
  const name = req.body.name;
  const ingredients = req.body.ingredients

  Recipe.findById(id, function (err, existingRecipe) {
    if (err) { return next(err) }

    existingRecipe.name = name
    existingRecipe.ingredients = ingredients
    existingRecipe.save(function (error) {
      if (err) { return next(err) }
      res.json({ success: "Recipe Updated" });
    })

  })

}