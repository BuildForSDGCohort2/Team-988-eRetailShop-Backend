"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suppliers.init(
    {
      suppliername: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Suppliers",
    }
  );
  return Suppliers;
};

function validateSupplier(supplier) {
  const schema = Joi.object({
    suppliername: Joi.string().min(2).max(50).required(),
    address: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(2).max(50).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  return schema.validate(supplier);
}

module.exports.validate = validateSupplier;
