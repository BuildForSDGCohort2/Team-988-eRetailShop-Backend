'use strict';
const {
  Model
} = require('sequelize');
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
  };
  Products.init({
    productname: DataTypes.STRING,
    productnumber: DataTypes.STRING,
    productlabel: DataTypes.STRING,
    startinginventory: DataTypes.INTEGER,
    inventoryshipped: DataTypes.INTEGER,
    inventoryonhand: DataTypes.INTEGER,
    minimumurequired: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};