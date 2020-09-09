const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const ordersCrontroller = require("../controllers/ordersController");

const ordersRoute = express.Router();

ordersRoute.get("/orders", auth, ordersCrontroller.list);

ordersRoute.get("/orders/:orderId", auth, ordersCrontroller.listById);

ordersRoute.post("/orders", auth, ordersCrontroller.create);

ordersRoute.put("/orders/:orderId", auth, ordersCrontroller.update);

ordersRoute.delete(
  "/orders/:orderId",
  [auth, profileCheck.isStoreManager],
  ordersCrontroller.delete
);

module.exports = ordersRoute;
