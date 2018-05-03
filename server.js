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
db.connect();
/** END MongoDB **/

/** BEGIN Authentication handlers **/

app.get('/logout', (req, res) => {
  app.locals.user = null;
  res.redirect('/login');
});

app.post('/login', (req, res) => {
  app.locals.user = req.body;
  res.redirect('/');
});

const controllers = {
	topic: require('./backend/mongo/controllers/topic_ctrl'),
	post: require('./backend/mongo/controllers/post_ctrl'),
	comment: require('./backend/mongo/controllers/comment_ctrl'),
	vote: require('./backend/mongo/controllers/vote_ctrl'),
	votable: require('./backend/mongo/controllers/votable_ctrl')
};

app.post('/api/mongo/:controller/:method', (req, res) => {
	console.log(req.params);
	controllers[req.params.controller][req.params.method](req.body)
		.then(result => {
			console.log(result);
			res.send(result);
		})
		.catch(error => {
			res.send(error);
		});
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
        id: '5ab7246f933609691c21ef0a',
        is_citizen: true
      }
    })
  });
});

app.listen(port, () => {
  console.log('Express server is up on port ' + port);
});

module.exports = app;
