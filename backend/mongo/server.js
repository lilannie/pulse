const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const citizens = require('./routes/citizen');

const port = 8080;

const app = express();
app.use(bodyParser.json());
app.use('/citizens', citizens);

app.get('/', (req, res) => {
  res.send('Hello! Welcome to the MongoDB Tutorial!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

mongoose.Promise = global.Promise;
mongoose.connect(config.url);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
});
mongoose.connection.on('error', err => {
  console.log('Oh no! Something Went Wrong!');
  process.exit();
});

module.exports = app;
