const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const salesCrontroller = require("../controllers/salesController");

const salesRoute = express.Router();

salesRoute.get("/sales", auth, salesCrontroller.list);

salesRoute.get("/sales/:saleId", auth, salesCrontroller.listById);

salesRoute.post("/sales", auth, salesCrontroller.create);

salesRoute.put("/sales/:saleId", auth, salesCrontroller.update);

salesRoute.delete(
  "/sales/:saleId",
  [auth, profileCheck.isStoreManager],
  salesCrontroller.delete
);

module.exports = salesRoute;
