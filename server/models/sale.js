"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sale.init(
    {
      productId: DataTypes.INTEGER,
      sales: DataTypes.INTEGER,
      price: DataTypes.REAL,
      orderId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Sale",
    }
  );
  return Sale;
};

function validateSale(sale) {
  const schema = Joi.object({
    productId: Joi.number().integer().required(),
    sales: Joi.number().integer().required(),
    price: Joi.number().required(),
    orderId: Joi.number().required(),
  });

  return schema.validate(sale);
}

module.exports.validate = validateSale;
