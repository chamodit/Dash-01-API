const express = require("express");
const database = require("./utill/database");
const middleware = require("./middleware");
const routes = require("./routes");

const app = express();

middleware(app);
routes(app);

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`Running on ${PORT}`);
});

database
  .connect()
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.log(err.message));
