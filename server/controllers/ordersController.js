const bcrypt = require("bcrypt");
const _ = require("lodash");
const Orders = require("../models").Orders;
const { validate } = require("../models/orders");

const ordersCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const order = await Orders.create({
      productid: req.body.productid,
      numbershipped: req.body.numbershipped,
      orderdate: req.body.orderdate,
      clientid: req.body.clientid,
    });

    if (!order) return res.status(404).send("order  not found");
    res.status(200).json({ data: { status: 1, statusMessage: "Order created!" } });
  },
  list: async (req, res) => {
    const orders = await Orders.findAll();
    if (!orders) return res.status(404).send("Orders  not found");
    res.status(200).json({ data: orders });
  },
  listById: async (req, res) => {
    const order = await Orders.findByPk(req.params.orderId);
    if (!order) return res.status(404).send("order  not found");
    res.status(200).json({ data: order });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let order = await Orders.findByPk(req.params.orderId);
    if (!order) return res.status(404).send("order  not found");
    order.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json({ data: { status: 1, statusMessage: "Order updated!" } });
  },
  delete: async (req, res) => {
    let order = await Orders.findByPk(req.params.orderId);
    if (!order) return res.status(404).send("order  not found");
    order.destroy();
    res.status(204).send("order deleted");
  },
};

module.exports = ordersCrontroller;
