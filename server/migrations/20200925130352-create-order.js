"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
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
      orderStatus: {
        type: Sequelize.BOOLEAN,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
