const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const orderController = require("../controllers/orderController");

const orderRoute = express.Router();

orderRoute.get("/order", auth, orderController.list);

orderRoute.get("/order/:orderId", auth, orderController.listById);

orderRoute.post("/order", auth, orderController.create);

orderRoute.put("/order/:orderId", auth, orderController.update);

orderRoute.delete("/order/:orderId", auth, orderController.delete);

module.exports = orderRoute;
