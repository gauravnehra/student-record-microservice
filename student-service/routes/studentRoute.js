const express = require("express");
const axios = require("axios");
const Student = require("../models/studentModel");

const route = express.Router();

route.post("/student", (req, res) => {
  if (
    !req.body.rollno ||
    !req.body.name ||
    !req.body.phone ||
    !req.body.email ||
    !req.body.cid ||
    req.body.cid.length === 0
  ) {
    return res.status(400).send({ message: "Missing Parameters" });
  }

  let student = new Student(req.body);

  student.save((err) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ message: "Success", student: student });
  });
});

route.get("/student/:rollno", async (req, res) => {
  let student = await Student.findOne({ rollno: req.params.rollno });

  if (!student) {
    return res.status(404).send({ message: "Not Found" });
  }

  let queryString = "";
  for (i = 0; i < student.cid.length; i++) {
    queryString = queryString + "courseId=" + student.cid[i] + "&";
  }

  let courseObject = await axios.get(
    "http://localhost:4000/course/?" + queryString
  );

  let courseTeacher = courseObject.data.courses;

  res
    .status(200)
    .send({ message: "Success", student: student, courses: courseTeacher });
});

module.exports = route;
