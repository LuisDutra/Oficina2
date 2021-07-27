const cors = require("cors");

const authRoutes = require("./auth");
const userRoutes = require("./user");
const plantRoutes = require("./plant");

const routes = (app) => {
  app.use("/api/auth", cors(), authRoutes);
  app.use("/api/user", cors(), userRoutes);
  app.use("/api/plant", cors(), plantRoutes);
};

module.exports = routes;