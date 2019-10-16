const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  unit: { type: String, unique: true },
  name: String,
  unitType : String,
  baseUnitAmount: Number,
  baseUnit: Array
})

const ModelClass = mongoose.model('unit', UnitSchema)

module.exports = ModelClass


/*
  UnitTypes :
  weight (gram,KG )
  liquid (ml,dl,cl,l )
  pieces (something counted per piece, like 1-2-3 potatoes)
*/