const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const productsCrontroller = require("../controllers/productsController");

const productsRoute = express.Router();

productsRoute.get("/products", auth, productsCrontroller.list);

productsRoute.get("/products/:productId", auth, productsCrontroller.listById);

productsRoute.get(
  "/products/categ/:categId",
  auth,
  productsCrontroller.listByCateg
);

productsRoute.post("/products", auth, productsCrontroller.create);

productsRoute.put(
  "/products/updateproductcount/:productId",
  auth,
  productsCrontroller.updateProductCount
);

productsRoute.put("/products/:productId", auth, productsCrontroller.update);

productsRoute.delete(
  "/products/:productId",
  [auth, profileCheck.isStoreManager],
  productsCrontroller.delete
);

module.exports = productsRoute;
