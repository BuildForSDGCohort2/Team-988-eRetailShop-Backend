const bcrypt = require("bcrypt");
const _ = require("lodash");
const SalesOrder = require("../models").SalesOrder;
const { validate } = require("../models/salesorder");
const generateInvoiceNumber = require("../services/generateInvoiceNumber");

const salesOrderCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let salesorder = new SalesOrder(
      _.pick(req.body, [
        "customerId",
        "sellerId",
        "productId",
        "sales",
        "tax",
        "netPrice",
        "totalPrice",
        "paymentMethod",
      ])
    );
    SalesOrder.addHook("beforeSave", (salesorder, options) => {
      salesorder.orderNumber = generateInvoiceNumber();
    });

    salesorder = await salesorder.save();

    if (!salesorder) return res.status(404).send("SalesOrder not created");
    res.status(200).json({ data: salesorder });
  },
  list: async (req, res) => {
    const salesorders = await SalesOrder.findAll();
    if (!salesorders) return res.status(404).send("SalesOrders  not found");
    res.status(200).json({ data: salesorders });
  },
  listById: async (req, res) => {
    const salesorder = await SalesOrder.findByPk(req.params.saleOrderId);
    if (!salesorder) return res.status(404).send("SalesOrder not found");
    res.status(200).json({ data: salesorder });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let salesorder = await SalesOrder.findByPk(req.params.saleOrderId);
    if (!salesorder) return res.status(404).send("SalesOrder not found");
    salesorder.update(req.body, { fields: Object.keys(req.body) });
    res
      .status(200)
      .json({ data: { status: 1, statusMessage: "salesOrder updated!" } });
  },
  delete: async (req, res) => {
    let salesorder = await SalesOrder.findByPk(req.params.saleOrderId);
    if (!salesorder) return res.status(404).send("salesOrder not found");
    salesorder.destroy();
    res.status(204).send("salesOrder deleted");
  },
};

module.exports = salesOrderCrontroller;
