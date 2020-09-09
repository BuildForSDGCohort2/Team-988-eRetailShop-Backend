const express = require("express");
const auth = require("../middleware/auth");
const profileCheck = require("../middleware/profileCheck");
const momoPayController = require("../controllers/momoPayController");
const CreateTokenAPI = require("../services/CreateTokenAPI");

const momoRoute = express.Router();

momoRoute.post("/generatetoken", CreateTokenAPI);
momoRoute.post("/momopay", momoPayController.doPayment);
momoRoute.get("/transactionstatus", momoPayController.getTransactionStatus);

module.exports = momoRoute;
