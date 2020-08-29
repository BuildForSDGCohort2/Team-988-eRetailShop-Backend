"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      productname: DataTypes.STRING,
      productnumber: DataTypes.STRING,
      image: DataTypes.STRING,
      startinginventory: DataTypes.INTEGER,
      inventoryshipped: DataTypes.INTEGER,
      inventoryonhand: DataTypes.INTEGER,
      minimumurequired: DataTypes.INTEGER,
      buyingPrice: DataTypes.INTEGER,
      sellingPrice: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};

function validateProduct(product) {
  const schema = Joi.object({
    productname: Joi.string().min(2).max(50).required(),
    productnumber: Joi.string().min(2).max(50).required(),
    image: Joi.string().min(2).max(50).required(),
    startinginventory: Joi.number().integer().required(),
    inventoryshipped: Joi.number().integer().required(),
    inventoryonhand: Joi.number().integer().required(),
    minimumurequired: Joi.number().integer().required(),
    buyingPrice: Joi.number().integer().required(),
    sellingPrice: Joi.number().integer().required(),
    categoryId: Joi.number().integer().required(),
  });

  return schema.validate(product);
}

module.exports.validate = validateProduct;
