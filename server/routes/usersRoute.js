const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");

const express = require("express");

const usersCrontroller = require("../controllers/usersController");

const usersRoute = express.Router();

usersRoute.get("/user", auth, usersCrontroller.list);

usersRoute.get("/user/:userId", auth, usersCrontroller.listById);

usersRoute.post("/user").post(usersCrontroller.create);

usersRoute.put("/user/:userId", auth, usersCrontroller.update);

usersRoute.delete(
  "/user/:userId",
  [auth, profileCheck.isStoreManager],
  usersCrontroller.delete
);

module.exports = usersRoute;
