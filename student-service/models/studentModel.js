const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollno: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cid: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
