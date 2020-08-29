const bcrypt = require("bcrypt");
const _ = require("lodash");
const Suppliers = require("../models").Suppliers;
const { validate } = require("../models/suppliers");

const suppliersCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const supplier = await Suppliers.create({
      suppliername: req.body.suppliername,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
    });

    if (!supplier) return res.status(404).send("Supplier  not found");
    res.status(200).json({ data: supplier });
  },
  list: async (req, res) => {
    const suppliers = await Suppliers.findAll();
    if (!suppliers) return res.status(404).send("Suppliers  not found");
    res.status(200).json({ data: suppliers });
  },
  listById: async (req, res) => {
    const supplier = await Suppliers.findByPk(req.params.supplierId);
    if (!supplier) return res.status(404).send("Supplier  not found");
    res.status(200).json({ data: supplier });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let supplier = await Suppliers.findByPk(req.params.supplierId);
    if (!supplier) return res.status(404).send("Supplier  not found");
    supplier.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json({ data: supplier });
  },
  delete: async (req, res) => {
    let supplier = await Suppliers.findByPk(req.params.suppliersId);
    if (!supplier) return res.status(404).send("Supplier  not found");
    supplier.destroy();
    res.status(204).send("Supplier deleted");
  },
};

module.exports = suppliersCrontroller;
