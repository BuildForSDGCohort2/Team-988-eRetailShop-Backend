const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const momoPayController = require("../controllers/momoPayController");
const CreateTokenAPI = require("../services/CreateTokenAPI");

const momoRoute = express.Router();

momoRoute.post("/generatetoken", auth, CreateTokenAPI);
momoRoute.post("/momopay/pay", auth, momoPayController.doPayment);
momoRoute.get(
  "/momopay/transactionstatus",
  auth,
  momoPayController.getTransactionStatus
);

module.exports = momoRoute;
