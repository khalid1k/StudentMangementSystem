const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'biodatas', required: true },
  testResults: [
    {
      testNumber: { type: String, unique: true },
      testDate: String,
      subjects: [
        {
          subject: String,
          marksObtained: Number
        }
      ]
    }
  ]
});

module.exports = mongoose.model('marks', markSchema);






