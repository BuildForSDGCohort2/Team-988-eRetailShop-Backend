const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const categoryCrontroller = require("../controllers/categoryController");

const categoryRoute = express.Router();

categoryRoute.get("/category", auth, categoryCrontroller.list);

categoryRoute.get("/category/:categoryId", auth, categoryCrontroller.listById);

categoryRoute.post("/category", auth, categoryCrontroller.create);

categoryRoute.put("/category/:categoryId", auth, categoryCrontroller.update);

categoryRoute.delete("/category/:categoryId",auth,categoryCrontroller.delete);

module.exports = categoryRoute;
