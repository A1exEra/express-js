const path = require("path");
const rootDir = require("../utils/path");
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const router = require("./router/theRouter");
const userRouter = require("./router/userRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  if (req.query.msg === "false") {
    res.locals.msg = "Wrong Username or Password!";
  } else {
    res.locals.msg = "";
  }
  next();
});

app.use("/", router);
app.use("/user", userRouter);

app.listen(3000);
