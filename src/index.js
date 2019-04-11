const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const port = process.env.NODE_ENV === "development" ? 3001 : 3010;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "../public")));
require("./routes/health")(app);
require("./routes/users")(app);
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../public", "index.html"));
});
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = app;
