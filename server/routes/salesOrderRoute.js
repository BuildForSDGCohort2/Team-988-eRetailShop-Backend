const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const salesOrderCrontroller = require("../controllers/salesOrderController");

const salesOrderRoute = express.Router();

salesOrderRoute.get("/salesorder", auth, salesOrderCrontroller.list);

salesOrderRoute.get(
  "/salesorder/:saleOrderId",
  auth,
  salesOrderCrontroller.listById
);

salesOrderRoute.post("/salesorder", auth, salesOrderCrontroller.create);

salesOrderRoute.put(
  "/salesorder/:saleOrderId",
  auth,
  salesOrderCrontroller.update
);

salesOrderRoute.delete(
  "/salesorder/:saleOrderId",
  auth,
  salesOrderCrontroller.delete
);

module.exports = salesOrderRoute;
