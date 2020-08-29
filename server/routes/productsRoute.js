const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");

const express = require("express");

const productsCrontroller = require("../controllers/productsController");

const productsRoute = express.Router();

productsRoute.get("/products", auth, productsCrontroller.list);

productsRoute.get("/products/:productId", auth, productsCrontroller.listById);

productsRoute.post("/products", auth, productsCrontroller.create);

productsRoute.put("/products/:productId", auth, productsCrontroller.update);

productsRoute.delete(
  "/products/:productId",
  [auth, profileCheck.isStoreManager],
  productsCrontroller.delete
);

module.exports = productsRoute;
