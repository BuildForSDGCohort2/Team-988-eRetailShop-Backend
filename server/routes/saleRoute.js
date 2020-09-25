const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const saleController = require("../controllers/saleController");

const saleRoute = express.Router();

saleRoute.get("/sale", auth, saleController.list);

saleRoute.get("/sale/:saleId", auth, saleController.listById);

saleRoute.post("/sale", auth, saleController.create);

saleRoute.put("/sale/:saleId", auth, saleController.update);

saleRoute.delete("/sale/:saleId", auth, saleController.delete);

module.exports = saleRoute;
