const ShoppingList = require('../models/shoppingList')

exports.getShoppingList = function (req, res, next) {
  const user = req.body.user;

  ShoppingList.findOne({ userId: user }, function (err, list) {
    if (err) { return next(err) }

    if (list === null) {
      list = new Recipe({
        userId: user
      })
    }
    res.json({ shoppingList: list })
  })
}

exports.addToShoppingList = function (req, res, next) {
  const listId = req.body.listId;
  const itemId = req.body.itemId

  ShoppingList.findById(listId, function (err, list) {
    if (err) { return next(err) }

    list.recipes.push(itemId);
    list.save(function (err, savedList) {
      if (err) { return next(err) }
      res.json({ shoppingList: savedList })
    })
  })
}

exports.removeFromShoppingList = function (req, res, next) {
  const listId = req.body.listId;
  const itemId = req.body.itemId

  ShoppingList.findById(listId, function (err, list) {
    if (err) { return next(err) }

    itemIndex = list.recipes.indexOf(itemId);
    if (itemIndex > -1) {
      removeItem = list.recipes.splice(itemIndex, 1)
      list.save(function (err, savedList) {
        if (err) { return next(err) }

        res.json({ shoppingList: savedList })
      })
    }
  })
}