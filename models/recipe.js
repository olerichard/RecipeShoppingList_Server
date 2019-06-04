const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  ingredients: Array,
  cookingSteps: Array,
  createdDate: Date,
  createdByUser: String,
  lastSaveDate: Date,
  lastSavedBy: String,
  picture: { data: Buffer, contentType: String },
  tags: Array,
})

const ModelClass = mongoose.model('recipe', recipeSchema)

module.exports = ModelClass