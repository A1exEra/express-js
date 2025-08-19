const createError = require("http-errors");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const movieRouter = require("./routes/movie");
const searchRouter = require("./routes/search");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(helmet({ contentSecurityPolicy: false }));

app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});
app.use((req, res, next) => {
  if (req.query.api_key !== "111") {
    res.status(401);
    res.json("Error! Invalid Api Key...");
  } else {
    next();
  }
});

app.use("/", indexRouter);
app.use("/movie", movieRouter);
app.use("/search", searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

module.exports = app;
