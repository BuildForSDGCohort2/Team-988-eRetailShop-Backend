const bcrypt = require("bcrypt");
const _ = require("lodash");
const Products = require("../models").Products;
const { validate } = require("../models/products");

const productsCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Products(
      _.pick(req.body, [
        "productname",
        "productnumber",
        "startinginventory",
        "minimumurequired",
        "buyingPrice",
        "sellingPrice",
        "categoryId",
      ])
    );

    product.inventoryonhand = Number(req.body.startinginventory);
    product.inventoryshipped = 0;
    product = await product.save();

    if (!product) return res.status(404).send("Product  not found");
    res
      .status(200)
      .json({ data: { status: 1, statusMessage: "Product created!" } });
  },
  list: async (req, res) => {
    const products = await Products.findAll();
    if (!products) return res.status(404).send("Products  not found");
    res.status(200).json({ data: products });
  },
  listByCateg: async (req, res) => {
    const products = await Products.findAll({
      where: { categoryId: req.params.categId },
    });
    if (!products) return res.status(404).send("Products  not found");
    res.status(200).json({ data: products });
  },
  listById: async (req, res) => {
    const product = await Products.findByPk(req.params.productId);
    if (!product) return res.status(404).send("Product  not found");
    res.status(200).json({ data: product });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = await Products.findByPk(req.params.productId);
    if (!product) return res.status(404).send("Product  not found");
    product.update(req.body, { fields: Object.keys(req.body) });
    res
      .status(200)
      .json({ data: { status: 1, statusMessage: "Product updated!" } });
  },
  updateProductCount: async (req, res) => {
    const salesCount = Number(req.body.sales);
    let product = await Products.findByPk(req.params.productId);
    if (!product) return res.status(404).send("Product  not found");
    await product.increment({
      inventoryshipped: salesCount,
      inventoryonhand: -salesCount,
    });
    product = await product.save();
    res
      .status(200)
      .json({ data: { status: 1, statusMessage: "product updated!" } });
  },
  delete: async (req, res) => {
    let product = await Products.findByPk(req.params.productId);
    if (!product) return res.status(404).send("Product  not found");
    product.destroy();
    res.status(204).send("Product deleted");
  },
};

module.exports = productsCrontroller;
