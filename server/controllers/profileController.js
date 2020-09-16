const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validate } = require("../models/profiles");
const Profiles = require("../models").Profiles;

const profileCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const profile = await Profiles.create({
      profilename: req.body.name,
    });

    if (!profile) return res.status(404).send("profile  not found");
    res.status(200).json({ data: profile });
  },
  list: async (req, res) => {
    const profiles = await Profiles.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!profiles) return res.status(404).send("profile  not found");
    res.status(200).json({ data: { status: 1, statusMessage: "Profile created!" } });
  },
  listById: async (req, res) => {
    const profile = await Profiles.findByPk(req.params.profileId);
    if (!profile) return res.status(404).send("profile  not found");
    res.status(200).json({ data: profile });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let profile = await Profiles.findByPk(req.params.profileId);
    if (!profile) return res.status(404).send("profile  not found");
    profile.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json({ data: { status: 1, statusMessage: "Profile updated!" } });
  },
  delete: async (req, res) => {
    let profile = await Profiles.findByPk(req.params.profileId);
    if (!profile) return res.status(404).send("profile  not found");
    profile.destroy();
    res.status(204).send("profile deleted");
  },
};

module.exports = profileCrontroller;
