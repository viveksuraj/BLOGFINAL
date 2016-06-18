var mongoose = require("mongoose");

var PlacesSchema = new mongoose.Schema({
  Title:String,
  Poster:String,
  Location:String
});
var Places = mongoose.model('myblog', PlacesSchema,'myblog')
module.exports = Places
