"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SalesOrders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderNumber: {
        type: Sequelize.STRING,
      },
      customerId: {
        type: Sequelize.INTEGER,
      },
      sellerId: {
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
      },
      sales: {
        type: Sequelize.INTEGER,
      },
      tax: {
        type: Sequelize.REAL,
      },
      netPrice: {
        type: Sequelize.REAL,
      },
      totalPrice: {
        type: Sequelize.REAL,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      externalId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("SalesOrders");
  },
};
