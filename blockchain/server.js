//database stuff
contractAddressList = [];
userCount = 1; //skips the 0 index because we create contracts from that account
record = {};
userHistory = [];


//web server stuff
const express = require('express');
const app = express();
const nodePort = 8545;
const serverPort = 3333;

//sets up blockchain interaction
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:" + nodePort));

//tells system to use JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//routes
require('./routes/index')(app, web3, contractAddressList, userCount, userHistory);

//start server
app.listen(serverPort, () => {
	console.log('Ethereum Node HTTP RESTful server on port: ' + serverPort + ' ...\n');
});

