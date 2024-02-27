//student BioData schema
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // roll:{ type: String, unique: true },
  name: String,
  fname: String,
  date:Date,
  cls:String,
  subject:String,
  mobile: String,
  email:String

});

module.exports = mongoose.model('biodata', studentSchema);
