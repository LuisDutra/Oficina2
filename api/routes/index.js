const cors = require("cors");

const authRoutes = require("./auth");
const userRoutes = require("./user");
const plantRoutes = require("./plant");
const categoryRoutes = require("./category");

const routes = (app) => {
  app.use("/api/auth", cors(), authRoutes);
  app.use("/api/user", cors(), userRoutes);
  app.use("/api/plant", cors(), plantRoutes);
  app.use("/api/category", cors(), categoryRoutes);
};

module.exports = routes;