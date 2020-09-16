const bcrypt = require("bcrypt");
const _ = require("lodash");
const Clients = require("../models").Clients;
const { validate } = require("../models/clients");

const clientsCrontroller = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const client = await Clients.create({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
    });

    if (!client) return res.status(404).send("client  not found");
    res.status(200).json({ data: { status: 1, statusMessage: "Client created!" } });
  },
  list: async (req, res) => {
    const clients = await Clients.findAll();
    if (!clients) return res.status(404).send("Clients  not found");
    res.status(200).json({ data: clients });
  },
  listById: async (req, res) => {
    const client = await Clients.findByPk(req.params.clientId);
    if (!client) return res.status(404).send("Client  not found");
    res.status(200).json({ data: client });
  },
  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let client = await Clients.findByPk(req.params.clientId);
    if (!client) return res.status(404).send("client  not found");
    client.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json({ data: { status: 1, statusMessage: "Client updated!" } });
  },
  delete: async (req, res) => {
    let client = await Clients.findByPk(req.params.clientId);
    if (!client) return res.status(404).send("client  not found");
    client.destroy();
    res.status(204).send("client deleted");
  },
};

module.exports = clientsCrontroller;
