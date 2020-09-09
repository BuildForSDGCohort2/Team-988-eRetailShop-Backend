require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const Base64 = require("js-base64").Base64;
const axios = require("axios");

const CreateTokenAPI = async (req, res) => {
  const user_uuid = uuidv4();
  const baseURL = process.env.MoMoURL + "v1_0/apiuser";
  const subscription_key = process.env.MoMoSubscriptionKey;
  const config_user = {
    method: "post",
    headers: {
      "X-Reference-Id": user_uuid,
      "Ocp-Apim-Subscription-Key": subscription_key,
    },
    data: {
      providerCallbackHost: process.env.MoMoCallBack,
    },
  };

  const URL_APIKEY = baseURL + "/" + user_uuid + "/apikey";
  const config_apikey = {
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": subscription_key,
    },
  };
  try {
    let response2 = "";
    let response3 = "";
    let response1 = await axios(baseURL, config_user);
    if (response1.status == "201")
      response2 = await axios(URL_APIKEY, config_apikey);
    const encoded = Base64.encode(user_uuid + ":" + response2.data.apiKey);
    const authEnc = "Basic " + encoded;
    const URL_token = process.env.MoMoURL + "collection/token/";
    const config_token = {
      method: "post",
      headers: {
        "X-Reference-Id": user_uuid,
        "Ocp-Apim-Subscription-Key": process.env.MoMoSubscriptionKey,
        Authorization: authEnc,
      },
    };
    if (response2.status == "201")
      response3 = await axios(URL_token, config_token);
    return res
      .header("x-auth-token", response3.data)
      .status(200)
      .json(response3.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = CreateTokenAPI;
