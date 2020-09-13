const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Users = require("../models").Users;
const generateAuthToken = require("../Services/generateAuthenticationToken");

const authCrontroller = {
  auth: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(400).send("Invalid username or password!");

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword)
      return res.status(400).send("Invalid username or password!");
    const token = generateAuthToken(user.username,user.profileid);
    res.send(token);
  },
};

function validate(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = authCrontroller;
