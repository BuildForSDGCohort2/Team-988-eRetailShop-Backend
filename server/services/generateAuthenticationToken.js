require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateAuthToken = (username,profileid) =>{
  const token = jwt.sign({ username: username,profileid: profileid},
    process.env.jwtPrivateKey
  );
  return token;
}

module.exports = generateAuthToken;
