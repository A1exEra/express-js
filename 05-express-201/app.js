const path = require("path");

const rootDir = require("../utils/path");
const express = require("express");
const helmet = require("helmet");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(helmet());
// app.use(helmet({
//     contentSecurityPolicy: false,
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

const validateUser = (req, res, next) => {
  res.locals.validated = true;
  console.log("VALIDATED RAN!");
  next();
};

app.get("/", (req, res, next) => {
  res.render("index");
});

app.listen(3000);
