require("dotenv").config();
const jwt = require("njwt");

const generateAuthToken = (payload) => {
  const token = jwt.create(payload, process.env.jwtPrivateKey);
  token.setExpiration(new Date().getTime() + 60 * 1000);
  return token.compact();
};

module.exports = generateAuthToken;
