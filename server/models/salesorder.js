"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SalesOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalesOrder.init(
    {
      orderNumber: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      sales: DataTypes.INTEGER,
      tax: DataTypes.REAL,
      netPrice: DataTypes.REAL,
      totalPrice: DataTypes.REAL,
      paymentMethod: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "SalesOrder",
    }
  );
  return SalesOrder;
};

function validateSaleOrder(saleorder) {
  const schema = Joi.object({
    customerId: Joi.number().integer().required(),
    sellerId: Joi.number().integer().required(),
    productId: Joi.number().integer().required(),
    sales: Joi.number().integer().required(),
    tax: Joi.number().required(),
    netPrice: Joi.number().required(),
    totalPrice: Joi.number().required(),
    paymentMethod: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(saleorder);
}

module.exports.validate = validateSaleOrder;
