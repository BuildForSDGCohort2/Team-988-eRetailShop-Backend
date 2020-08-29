const bcrypt = require("bcrypt");
const _ = require("lodash");
const Sales = require("../models").Sales;
const { validate } = require("../models/sales");

const salesCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const sale = await Sales.create({
      customerId: req.body.customerId,
      sellerId: req.body.sellerId,
      productId: req.body.productId,
      sales: req.body.sales,
      tax: req.body.tax,
      netPrice: req.body.netPrice,
      totalPrice: req.body.totalPrice,
      paymentMethod: req.body.paymentMethod,
      salestype: req.body.salestype,
    });

    if (!sale) return res.status(404).send("Sale  not found");
    res.status(200).json({ data: sale });
  },
  list: async (req, res) => {
    const sales = await Sales.findAll();
    if (!sales) return res.status(404).send("Sales  not found");
    res.status(200).json({ data: sales });
  },
  listById: async (req, res) => {
    const sale = await Sales.findByPk(req.params.saleId);
    if (!sale) return res.status(404).send("Sale  not found");
    res.status(200).json({ data: sale });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let sale = await Sales.findByPk(req.params.saleId);
    if (!sale) return res.status(404).send("Sale  not found");
    sale.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json({ data: sale });
  },
  delete: async (req, res) => {
    let sale = await Sales.findByPk(req.params.saleId);
    if (!sale) return res.status(404).send("Sale  not found");
    sale.destroy();
    res.status(204).send("Sale deleted");
  },
};

module.exports = salesCrontroller;
