const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");

const express = require("express");

const purchasesCrontroller = require("../controllers/purchasesController");

const purchasesRoute = express.Router();

purchasesRoute.get("/purchases", auth, purchasesCrontroller.list);

purchasesRoute.get(
  "/purchases/:purchaseId",
  auth,
  purchasesCrontroller.listById
);

purchasesRoute.post("/purchases", auth, purchasesCrontroller.create);

purchasesRoute.put("/purchases/:purchaseId", auth, purchasesCrontroller.update);

purchasesRoute.delete(
  "/purchases/:purchaseId",
  [auth, profileCheck.isStoreManager],
  purchasesCrontroller.delete
);

module.exports = purchasesRoute;
