const   path        = require('path');
const		logger      = require('morgan');
const		express     = require('express');
const		app         = express();
const   bodyParser  = require('body-parser');
const   port        = 8080;
const   mongoose    = require('mongoose');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve('public')));
app.set('view engine', 'ejs');

/** BEGIN MongoDB **/

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://quinns-macbook:8080');
// mongoose.connection.once('open', () => {
// 	console.log('Connected to MongoDB!');
// });
// mongoose.connection.on('error', err => {
// 	console.log(err);
// 	console.log('Oh no! Something Went Wrong!');
// 	process.exit();
// });

/** END MongoDB **/

/** BEGIN Authentication handlers **/

app.get('/logout', (req, res) => {
  app.locals.user = null;
  res.redirect('/');
});

app.post('/login', (req, res)  => {
	app.locals.user = req.body;
	res.redirect('/');
});

/** END Authentication handlers **/

app.all('/*', (req, res) => {
	if (req.path !== '/login' && (app.locals.user === undefined || app.locals.user === null) ) {
		res.redirect('/login');
		return;
	}

  res.render('index', {
    appData: JSON.stringify({
      user: app.locals.user
    })
  });
});

app.listen(port, () => {
  console.log('Express server is up on port '+port);
});

module.exports = app;
