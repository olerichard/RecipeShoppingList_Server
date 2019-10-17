const ShoppingList = require('../models/shoppingList')
const Recipe = require('../models/recipe')

exports.getShoppingList = async function (req, res, next) {
  const user = req.body.user;
  const head = req.head; 
  if(user === undefined || user === null || user === ""){
    console.log("ShoppingList: No user exiting")
    res.json({error:"No User"});
    return
  }

  const fetchedShoppinglist = await getShoppingList(user);

  if(fetchedShoppinglist !== null){
    console.log("ShoppingList: List Found")
    fetchedShoppinglist.recipes = await getShoppingListRecipesMetaData(fetchedShoppinglist.recipes)
    console.log("ShoppingList: recipes MetaData populated ")
    console.log(fetchedShoppinglist)
    res.json({success : fetchedShoppinglist})
    return
  }

  console.log("ShoppingList: No shoppinglist found for user:" + user)
  const newShoppingList = new ShoppingList({
    userId: user
  });
  saveList(newShoppingList);
  res.json({success : newShoppingList})
}

async function getShoppingList(user){
  return await ShoppingList.findOne({ userId: user })
}

async function getShoppingListRecipesMetaData (recipesId) {
  console.log("getShoppingListMetaData")
  return await Recipe.find({
    "_id":{
      $in:recipesId
    }
  })
}

function saveList(list){
  list.save(function (err, savedList) {
    if (err) { return next(err) }
    
    return savedList;
  })
}

async function getShoppingListById(listId){
  return await ShoppingList.findById(listId);
}



exports.addToShoppingList = function (req, res, next) {
  const listId = req.body.listId;
  const itemId = req.body.itemId

  console.log("Add to List ID:"+ listId)
  console.log("Add to List Item:"+ itemId)

  ShoppingList.findById(listId, function (err, list) {
    if (err) { return next(err) }

    list.recipes.push(itemId);
    list.save(function (err, savedList) {
      if (err) { return next(err) }
      res.json({ success: savedList })
    })
  })
}

exports.removeFromShoppingList = async function (req, res, next) {
  const listId = req.body.listId;
  const itemId = req.body.itemId
  console.log("Remove itemID: " + itemId + " from listId:" + listId)

  const shoppingList = await getShoppingListById(listId);
  console.log( "THE LIST: " + shoppingList.recipes)
  const itemIndex = shoppingList.recipes.findIndex(r => r === itemId);
  console.log("Index off Item:" + itemIndex)
  if (itemIndex <= -1){
    console.log("Item Not Found")
    res.json({error:"Item Not found"})
    return
  }
  

  const removeItem = shoppingList.recipes.splice(itemIndex, 1)
  console.log("RemovedItem id:" + removeItem);
  console.log("Remaining ShoppingList Recipes:")
  console.log(shoppingList.recipes);
  saveList(shoppingList)
  res.json({ success: shoppingList })
}