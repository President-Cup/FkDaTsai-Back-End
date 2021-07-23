const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
// const path = require("path");

// Ininial D
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(passport.initialize());

// Serve frontend
// app.use(express.static("public"));

// Passport config
// require("./config/passport");

// API Entry Point, v1
app.use("/api/v1", require("./router/index"));

// Global 404 page
// app.get("*", function (req, res) {
//   res.status(404).sendFile(path.join(__dirname + "/public/404.html"));
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
