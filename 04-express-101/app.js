const path = require("path");

const rootDir = require("./utils/path");
const express = require("express");

const app = express();
app.use(express.static(path.join(rootDir, "public")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "public/node.html"));
});
app.post("/", (req, res, next) => {
  res.send("<h1>God OF Code - POST route</h1>");
});

app.listen("3000");
