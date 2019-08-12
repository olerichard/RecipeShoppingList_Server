const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingListSchema = new Schema({
  userId: { type: String },
  recipes: { type: Array }
})

const ModelClass = mongoose.model('ShoppingList', ShoppingListSchema)

module.exports = ModelClass