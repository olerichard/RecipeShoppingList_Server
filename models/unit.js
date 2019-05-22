const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  shortName: { type: String, unique: true },
  name: String,
})

const ModelClass = mongoose.model('unit', UnitSchema)

module.exports = ModelClass