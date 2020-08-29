"use strict";
const Joi = require("joi").extend(require("@hapi/joi-date"));
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init(
    {
      productid: DataTypes.INTEGER,
      numbershipped: DataTypes.INTEGER,
      orderdate: DataTypes.DATE,
      clientid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};

function validateOrder(order) {
  const schema = Joi.object({
    productid: Joi.number().integer().required(),
    numbershipped: Joi.number().integer().required(),
    orderdate: Joi.date().format("YYYY-MM-DD").required(),
    clientid: Joi.number().integer().required(),
  });

  return schema.validate(order);
}

module.exports.validate = validateOrder;
