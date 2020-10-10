const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/studentRoute"));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started...", server.address().port);
  connectToDatabase();
});

function connectToDatabase() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to student db...");
    })
    .catch((err) => {
      console.log("Could not connect to DB...", err);
      process.exit();
    });
}
