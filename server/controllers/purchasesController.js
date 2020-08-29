const bcrypt = require("bcrypt");
const _ = require("lodash");
const Purchases = require("../models").Purchases;
const { validate } = require("../models/purchases");

const purchasesCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const purchase = await Purchases.create({
      supplierid: req.body.supplierid,
      productid: req.body.productid,
      numberreceived: req.body.numberreceived,
      purchasedate: req.body.purchasedate,
    });

    if (!purchase) return res.status(404).send("Purchase  not found");
    res.status(200).json({ data: purchase });
  },
  list: async (req, res) => {
    const purchases = await Purchases.findAll();
    if (!purchases) return res.status(404).send("Purchases  not found");
    res.status(200).json({ data: purchases });
  },
  listById: async (req, res) => {
    const purchase = await Purchases.findByPk(req.params.purchaseId);
    if (!purchase) return res.status(404).send("Purchase  not found");
    res.status(200).json({ data: purchase });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let purchase = await Purchases.findByPk(req.params.purchaseId);
    if (!purchase) return res.status(404).send("Purchase  not found");
    purchase.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json({ data: purchase });
  },
  delete: async (req, res) => {
    let purchase = await Purchases.findByPk(req.params.purchaseId);
    if (!purchase) return res.status(404).send("Purchase  not found");
    purchase.destroy();
    res.status(204).send("Purchase deleted");
  },
};

module.exports = purchasesCrontroller;
