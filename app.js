const express = require("express");
var cors = require("cors");
const bookmarks = require("./routes/bookmarks");
const reviews = require("./routes/reviews");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/bookmarks", bookmarks);
app.use("/reviews", reviews);
app.use("/*", (req, res) => {
  res.status(403).send("Not Found!");
});
module.exports = app;
