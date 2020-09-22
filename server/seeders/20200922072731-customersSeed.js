"use strict";
const customersdata = require("./customersData.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let customers = [];
    customersdata.map((c) => {
      customers.push({
        name: c.name,
        address: c.phone,
        phone: c.phone,
        email: c.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return await queryInterface.bulkInsert("Clients", customers);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Clients", null, {});
  },
};
