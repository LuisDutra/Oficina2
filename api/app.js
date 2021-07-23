require("dotenv").config();

const express = require("express");
const routes = require("./routes/index");

const port = process.env.PORT || 8080;
const app = express();

require("./database/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
routes(app);

// Server
app.listen(port, (err) => {
  if (err) {
    console.log("Error when starting server!");
  } else {
    console.log(`Server is started on port ${port}...`);
  }
});