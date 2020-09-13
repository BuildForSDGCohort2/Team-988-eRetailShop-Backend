"use strict";
const Joi = require("joi");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      profileid: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    },
    // Class Method
  );
  return Users;
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(2).max(50).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    profileid: Joi.number().integer().required(),
    photo: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(user);
}
module.exports.validate = validateUser;
