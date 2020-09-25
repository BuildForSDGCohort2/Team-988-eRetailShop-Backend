const _ = require("lodash");
const Sale = require("../models").Sale;
const { validate } = require("../models/sale");

const saleController = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const sale = await Sale.create(
      _.pick(req.body, ["productId", "sales", "price", "orderId"])
    );

    if (!sale) return res.status(404).send("Sale not created");
    res.status(200).json({ data: sale });
  },
  list: async (req, res) => {
    const sales = await Sale.findAll();
    if (!sales) return res.status(404).send("Sales  not found");
    res.status(200).json({ data: sales });
  },
  listById: async (req, res) => {
    const sale = await Sale.findByPk(req.params.saleId);
    if (!sale) return res.status(404).send("Sale not found");
    res.status(200).json({ data: sale });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let sale = await Sale.findByPk(req.params.saleId);
    if (!sale) return res.status(404).send("Sale not found");
    sale.update(req.body, { fields: Object.keys(req.body) });
    res
      .status(200)
      .json({ data: { status: 1, statusMessage: "sale updated!" } });
  },
  delete: async (req, res) => {
    let sale = await Sale.findByPk(req.params.saleId);
    if (!sale) return res.status(404).send("sale not found");
    sale.destroy();
    res.status(204).send("sale deleted");
  },
};

module.exports = saleController;
