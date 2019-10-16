const Unit = require('../models/unit')

exports.getUnitAll = function (req, res, next) {
    Unit.find(function (err, units) {
      if (err) { return next(err) }
  
      res.json({ success: units })
    })
  }
  
exports.GetUnitById = function (req, res, next) {
    var id = req.query.id;
    console.log("ID: " + id)
    Unit.findById(id, function (err, unit) {
      if (err) { return next(err) }
      res.json({ success: unit })
    })
}