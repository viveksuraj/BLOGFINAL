var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
  Title:String,
  Location:String
});

var Places = mongoose.model('myblog', movieSchema,'myblog')
module.exports = Places
