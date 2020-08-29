const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");

const express = require("express");

const clientsCrontroller = require("../controllers/clientsController");

const clientsRoute = express.Router();

clientsRoute.get("/clients", auth, clientsCrontroller.list);

clientsRoute.get("/clients/:clientId", auth, clientsCrontroller.listById);

clientsRoute.post("/clients", auth, clientsCrontroller.create);

clientsRoute.put("/clients/:clientId", auth, clientsCrontroller.update);

clientsRoute.delete(
  "/clients/:clientId",
  [auth, profileCheck.isStoreManager],
  clientsCrontroller.delete
);

module.exports = clientsRoute;
