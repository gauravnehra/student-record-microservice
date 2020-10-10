const express = require("express");
const Teacher = require("../models/teacherModel");

const route = express.Router();

route.post("/teacher", (req, res) => {
  if (!req.body.name || !req.body.cid || req.body.cid.length === 0) {
    return res.status(400).send({ message: "Missing Parameters" });
  }

  let teacher = new Teacher(req.body);

  teacher.save((err) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ message: "Success", teacher: teacher });
  });
});

/**
 * @requires
 * @param {Objectid} coursesId
 *
 * @returns
 * @param {Object} teacher
 */
route.get("/teacher/:cid", (req, res) => {
  Teacher.findOne({ cid: req.params.cid }, (err, teacher) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send(teacher.name);
    }
  });
});

module.exports = route;
