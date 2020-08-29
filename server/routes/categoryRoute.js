const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");

const express = require("express");

const categoryCrontroller = require("../controllers/categoryController");

const categoryRoute = express.Router();

categoryRoute.get("/category", auth, categoryCrontroller.list);

categoryRoute.get("/category/:categoryId", auth, categoryCrontroller.listById);

categoryRoute.post("/category", auth, categoryCrontroller.create);

categoryRoute.put("/category/:categoryId", auth, categoryCrontroller.update);

categoryRoute.delete(
  "/category/:categoryId",
  [auth, profileCheck.isStoreManager],
  categoryCrontroller.delete
);

module.exports = categoryRoute;
