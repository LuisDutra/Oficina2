const cors = require("cors");

const authRoutes = require("./auth");
const userRoutes = require("./user");

const routes = (app) => {
  app.use("/api/auth", cors(), authRoutes);
  app.use("/api/user", cors(), userRoutes);
};

module.exports = routes;