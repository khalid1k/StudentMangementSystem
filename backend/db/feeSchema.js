const mongoose=require('mongoose');
const feeSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'biodata', required: true },
    feeDate: { type: Date, default: Date.now },
    amount: Number,
    monthYear: {type:String, unique:true,},//MM-YYYY fromat
    pDues: Number,
    tId: String ,// You will generate and save the unique transaction ID here
  });
  module.exports = mongoose.model('fees', feeSchema);  