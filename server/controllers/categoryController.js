const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validate } = require("../models/category");
const Category = require("../models").Category;

const categoryCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.create({
      name: req.body.name,
    });

    if (!category) return res.status(404).send("Category  not found");
    res.status(200).json({ data: { status: 1, statusMessage: "Category created!" } });
  },
  list: async (req, res) => {
    const categories = await Category.findAll();
    if (!categories) return res.status(404).send("Category  not found");
    res.status(200).json({ data: categories });
  },
  listById: async (req, res) => {
    const category = await Category.findByPk(req.params.categoryId);
    if (!category) return res.status(404).send("Category  not found");
    res.status(200).json({ data: category });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = await Category.findByPk(req.params.categoryId);
    if (!category) return res.status(404).send("Category  not found");
    category.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json({ data: { status: 1, statusMessage: "Category updated!" } });
  },
  delete: async (req, res) => {
    let category = await Category.findByPk(req.params.categoryId);
    if (!category) return res.status(404).send("category  not found");
    category.destroy();
    res.status(204).send("Category deleted");
  },
};

module.exports = categoryCrontroller;
