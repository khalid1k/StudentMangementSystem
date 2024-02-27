const mongoose=require('mongoose');
const url="mongodb://127.0.0.1:27017/Academy";
module.exports=mongoose.connect(url);