const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// Include Routes
const usersRoute = require("./usersRoute");
const authRoute = require("./authRoute");

const categoryRoute = require("./categoryRoute");
const clientsRoute = require("./clientsRoute");
const ordersRoute = require("./ordersRoute");
const productsRoute = require("./productsRoute");
const purchasesRoute = require("./purchasesRoute");
const salesRoute = require("./salesRoute");
const suppliersRoute = require("./suppliersRoute");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.get("/api/v1/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the eRetailShop Backend API",
  })
);

app.use("/api/v1/", authRoute);
app.use("/api/v1/", usersRoute);
app.use("/api/v1/", categoryRoute);
app.use("/api/v1/", clientsRoute);
app.use("/api/v1/", ordersRoute);
app.use("/api/v1/", productsRoute);
app.use("/api/v1/", purchasesRoute);
app.use("/api/v1/", salesRoute);
app.use("/api/v1/", suppliersRoute);
module.exports = app;
