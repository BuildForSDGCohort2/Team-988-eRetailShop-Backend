require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateAuthToken = (userid, username,profileid,first_login_flag) =>{
  const token = jwt.sign({ userid:userid,username: username,profileid: profileid, first_login_flag:first_login_flag},
    process.env.jwtPrivateKey
  );
  return token;
}

module.exports = generateAuthToken;
