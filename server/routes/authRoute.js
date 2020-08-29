const express = require("express");

const authCrontroller = require("../controllers/authController");

const authRoute = express.Router();

authRoute.post("/auth", authCrontroller.auth);

module.exports = authRoute;
