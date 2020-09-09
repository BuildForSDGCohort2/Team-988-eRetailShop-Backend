require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const Base64 = require("js-base64").Base64;
const axios = require("axios");

const momoPayController = {
  doPayment: async (req, res) => {
    const user_uuid = uuidv4();
    const URL = process.env.MoMoURL + "collection/v1_0/requesttopay";
    let responseToken = "";
    try {
      responseToken = await axios.post(process.env.MomoTokenURL);
    } catch (error) {
      console.log(error);
    }

    const authToken = "Bearer " + responseToken.data.access_token;
    const config = {
      method: "post",
      headers: {
        "X-Reference-Id": user_uuid,
        "Ocp-Apim-Subscription-Key": process.env.MoMoSubscriptionKey,
        "X-Target-Environment": "sandbox",
        Authorization: authToken,
      },
      data: {
        amount: req.body.amount,
        currency: req.body.currency,
        externalId: req.body.externalId,
        payer: {
          partyIdType: "MSISDN",
          partyId: req.body.phone,
        },
        payerMessage: req.body.payerMessage,
        payeeNote: req.body.payeeNote,
      },
    };

    try {
      let response = await axios(URL, config);
      if (!response.status == "202")
        return res.status(404).send("UUID  not found");
      return res
        .status(202)
        .json({ uuid: user_uuid, authCode: authToken, data: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  getTransactionStatus: async (req, res) => {
    const URL =
      process.env.MoMoURL +
      "collection/v1_0/requesttopay/" +
      req.body.uuid_user;
    const config = {
      method: "get",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.MoMoSubscriptionKey,
        "X-Target-Environment": "sandbox",
        Authorization: req.body.authToken,
      },
    };

    try {
      let response = await axios(URL, config);
      if (response.status == "200") return res.status(200).json(response.data);
      return res.status(response.status).json(response.statusText);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = momoPayController;
