require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const connectDatabase = require("./config/database");
const middleware = require("./middleware");
const routes = require("./routes");

const app = express();

middleware(app);
routes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

connectDatabase();

module.exports = app;
