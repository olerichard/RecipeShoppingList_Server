const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String },
  ingredients: { type: Array }
})

const ModelClass = mongoose.model('recipe', recipeSchema)

module.exports = ModelClass