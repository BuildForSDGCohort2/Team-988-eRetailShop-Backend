const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Users = require("../models").Users;
const generateAuthToken = require("../services/generateAuthenticationToken");

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

    const userData = {
      userid: user.id,
      username: user.username,
      profileid: user.profileid,
      first_login_flag: user.first_login_flag,
    };
    const token = generateAuthToken(userData);
    res.send(token);
  },
  updateFirstLogin: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const encryptPwd = await bcrypt.hash(req.body.confirmpassword, salt);
    let user = await Users.findByPk(req.params.userId);
    if (!user) return res.status(404).send("user  not found");
    user.update({ first_login_flag: false, password: encryptPwd });
    user = await user.save();
    res
      .status(200)
      .json({ data: { status: 1, statusMessage: "User updated!" } });
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
