"use strict";
const productsdata = require("./productsData.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let products = [];
    productsdata.map((p) => {
      products.push({
        productname: p.description,
        productnumber: p.code,
        image: p.image,
        startinginventory: p.stock,
        inventoryshipped: 0,
        inventoryonhand: 0,
        minimumurequired: 5,
        buyingPrice: p.buyingPrice,
        sellingPrice: p.sellingPrice,
        categoryId: p.CategoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return await queryInterface.bulkInsert("Products", products);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Products", null, {});
  },
};
