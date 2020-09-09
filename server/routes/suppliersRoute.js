const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const suppliersCrontroller = require("../controllers/suppliersController");

const suppliersRoute = express.Router();

suppliersRoute.get("/suppliers", auth, suppliersCrontroller.list);

suppliersRoute.get(
  "/suppliers/:supplierId",
  auth,
  suppliersCrontroller.listById
);

suppliersRoute.post("/suppliers", auth, suppliersCrontroller.create);

suppliersRoute.put("/suppliers/:supplierId", auth, suppliersCrontroller.update);

suppliersRoute.delete(
  "/suppliers/:supplierId",
  [auth, profileCheck.isStoreManager],
  suppliersCrontroller.delete
);

module.exports = suppliersRoute;
