const axios = require('axios');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;
const dotenv = require('dotenv')

//middleware
app.use(bodyParser.json());

dotenv.config()

app.use(express.json());
app.use(cors());

//create route to generate access token using axios GET method 
const createToken = async (req,res) => {
    const apiKey = process.env.API_KEY;
    const consumerSecret = process.env.CONSUMER_SECRET;
    const url = process.env.URL;

    //encode the consumer key and consumer secret into a Base64-encoded string, which can be used as the value for the Authorization header when making HTTP requests that require authentication.
    const auth = Buffer.from(apiKey + ':' + consumerSecret).toString('base64');

    await axios.get(url,
        {
        headers: {
            authorization: `Basic ${auth}`,
          },
    }
    )
    .then((data) => {
        token = data.data.access_token;
        console.log(data.data);
        next();
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err.message);
    });
};

//create a route to initiate the STK push using axios post methos
const stkPush = async (req,res) => {
    //when pushing code to github make sure to hide these credentials using .env
    const shortCode = process.env.SHORT_CODE;
    const phone = req.body.phoneNumber.substring(1);
    const amount = req.body.amount;
    const name = req.body.name;
    const url = process.env.URL;
    //copied the passkey from github repo
    const passkey = process.env.PASSKEY;

    //a timestamp initiating when the request was executed
    const date = new Date();
    const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

    //a password for authentication your request
    const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

    const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        Name: name,
        PartyA: `254${phone}`,
        PartyB: process.env.SHORT_CODE,
        PhoneNumber: `254${phone}`,
        //make sure you use the url to where your app is being hosted
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "Mpesa Test",
        TransactionDesc: "Testing stk push",
    };

    //you need the access token to generate an STK push
    await axios.post(url, data, {
        headers: {
            authorization: `Bearer ${token}`,
          },
    })
    .then((data) => {
        console.log(data);
        res.status(200).json(data.data); 
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err.message);
    });
};

module.exports = { createToken, stkPush };