const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./backend/mongo/config/database');
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve('public')));

app.set('view engine', 'ejs');

/** BEGIN MongoDB **/
// db.connect();
/** END MongoDB **/

/** BEGIN Blockchain **/
let contractAddressList = [];
let userCount = 1; //skips the 0 index because we create contracts from that account
let record = {};
let userHistory = [];
const blockchain_port = 8545;

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:" + blockchain_port));

//routes
require('./backend/blockchain/routes')(app, web3, contractAddressList, userCount, userHistory);

/** END Blockchain **/

/** BEGIN Authentication handlers **/

app.get('/logout', (req, res) => {
  app.locals.user = null;
  res.redirect('/login');
});

app.post('/login', (req, res) => {
  app.locals.user = req.body;
  res.redirect('/');
});

/** END Authentication handlers **/

app.all('/*', (req, res) => {
  // if (req.path !== '/login' && (app.locals.user === undefined || app.locals.user === null) ) {
  // 	res.redirect('/login');
  // 	return;
  // }

  console.log(req.path);

  res.render('index', {
    // appData: JSON.stringify({
    //   user: app.locals.user
    // })

    appData: JSON.stringify({
      user: {
        id: '1234567',
        is_citizen: true
      }
    })
  });
});

app.listen(port, () => {
  console.log('Express server is up on port ' + port);
});

module.exports = app;
