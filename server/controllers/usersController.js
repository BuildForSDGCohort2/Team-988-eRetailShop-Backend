const bcrypt = require("bcrypt");
const _ = require("lodash");
const Users = require("../models").Users;
const { validate } = require("../models/users");

const usersCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({ where: { username: req.body.username } });
    if (user) return res.status(400).send("User already registered.");

    user = new Users(
      _.pick(req.body, [
        "name",
        "username",
        "email",
        "password",
        "profileid",
        "phone",
        "photo",
      ])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.status = true;
    user = await user.save();
    if (!user) return res.status(404).send("user  not found");

    const token = Users.generateAuthToken();

    res.header("x-auth-token", token).status(200).json({ data: user });
  },
  list: async (req, res) => {
    const users = await Users.findAll({
    attributes: {
        exclude: ['password']
    }
   });
    if (!users) return res.status(404).send("users  not found");
    res.status(200).json({ data: users });
  },
  listById: async (req, res) => {
    const user = await Users.findByPk(req.params.userId);
    if (!user) return res.status(404).send("users  not found");
    res.status(200).json({ data: user });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Users.findByPk(req.params.userId);
    if (!user) return res.status(404).send("user  not found");
    user.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json({ data: user });
  },
  delete: async (req, res) => {
    let user = await Users.findByPk(req.params.userId);
    if (!user) return res.status(404).send("user  not found");
    user.destroy();
    res.status(204).send("user deleted");
  },
};

module.exports = usersCrontroller;
