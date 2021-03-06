"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      orderNumber: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      tax: DataTypes.REAL,
      netPrice: DataTypes.REAL,
      totalPrice: DataTypes.REAL,
      paymentMethod: DataTypes.STRING,
      externalId: DataTypes.STRING,
      orderStatus: DataTypes.BOOLEAN,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Order",
    }
  );
  return Order;
};

function validateOrder(order) {
  const schema = Joi.object({
    customerId: Joi.number().integer().required(),
    sellerId: Joi.number().integer().required(),
    tax: Joi.number().required(),
    netPrice: Joi.number().required(),
    totalPrice: Joi.number().required(),
    paymentMethod: Joi.string().min(2).max(50).required(),
    externalId: Joi.string().min(2).max(100).required(),
  });

  return schema.validate(order);
}

module.exports.validate = validateOrder;
