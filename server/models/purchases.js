"use strict";
const Joi = require("joi").extend(require("@hapi/joi-date"));
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Purchases.init(
    {
      supplierid: DataTypes.INTEGER,
      productid: DataTypes.INTEGER,
      numberreceived: DataTypes.INTEGER,
      purchasedate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Purchases",
    }
  );
  return Purchases;
};

function validatePurchase(purchase) {
  const schema = Joi.object({
    supplierid: Joi.number().integer().required(),
    productid: Joi.number().integer().required(),
    purchasedate: Joi.date().format("YYYY-MM-DD").required(),
    numberreceived: Joi.number().integer().required(),
  });

  return schema.validate(purchase);
}

module.exports.validate = validatePurchase;
