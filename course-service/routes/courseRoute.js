const express = require("express");
const axios = require("axios");
const Course = require("../models/courseModel");
const route = express.Router();

route.post("/course", (req, res) => {
  if (!req.body.name || !req.body.duration || !req.body.marks) {
    return res.status(400).send({ message: "Missing Parameters" });
  }

  let course = new Course(req.body);

  course.save((err) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send({ message: "Success", course: course });
    }
  });
});

/**
 * @requires
 * @param {Array} coursesIds
 *
 * @returns
 * @param {Array} courses
 */
route.get("/course", (req, res) => {
  let coursesIds = req.query.courseId;
  if (!coursesIds || coursesIds.length === 0) {
    return res.status(400).send({ message: "Missing Parameters" });
  }

  Course.find({ _id: { $in: coursesIds } }, async (err, courses) => {
    if (err) res.status(500).send(err);
    else {
      let courseTeacherArray = [];
      for (i = 0; i < courses.length; i++) {
        let teacherName = await axios.get(
          `http://localhost:5000/teacher/${courses[i]._id}`
        );
        let courseTeacher = {
          course: {},
          teacherName: "",
        };
        courseTeacher.teacherName = teacherName.data;
        courseTeacher.course = courses[i];
        courseTeacherArray.push(courseTeacher);
      }
      res.status(200).send({ message: "Success", courses: courseTeacherArray });
    }
  });
});

module.exports = route;
