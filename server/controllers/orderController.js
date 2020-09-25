const _ = require("lodash");
const Order = require("../models").Order;
const { validate } = require("../models/order");
const generateInvoiceNumber = require("../services/generateInvoiceNumber");

const orderController = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let order = new Order(
      _.pick(req.body, [
        "customerId",
        "sellerId",
        "tax",
        "netPrice",
        "totalPrice",
        "paymentMethod",
        "externalId",
      ])
    );
    Order.addHook("beforeSave", (order, options) => {
      order.orderNumber = generateInvoiceNumber();
    });
    order.orderStatus = true;
    order = await order.save();

    if (!order) return res.status(404).send("Order not created");
    res.status(200).json({ data: order });
  },
  list: async (req, res) => {
    const orders = await Order.findAll();
    if (!orders) return res.status(404).send("Orders  not found");
    res.status(200).json({ data: orders });
  },
  listById: async (req, res) => {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).send("Order not found");
    res.status(200).json({ data: order });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).send("Order not found");
    order.update(req.body, { fields: Object.keys(req.body) });
    res
      .status(200)
      .json({ data: { status: 1, statusMessage: "Order updated!" } });
  },
  delete: async (req, res) => {
    let order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).send("Order not found");
    order.destroy();
    res.status(204).send("Order deleted");
  },
};

module.exports = orderController;
