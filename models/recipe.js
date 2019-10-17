const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  ingredients: Array,
  cookingSteps: Array,
  createdDate: Date,
  createdByUser: Object,
  lastSaveDate: Date,
  lastSavedBy: Object,
  picture: { data: Buffer, contentType: String },
  tags: Array,
})

const ModelClass = mongoose.model('recipe', recipeSchema)

module.exports = ModelClass