const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');
const Sequelize = require('sequelize');
let sequelize = require('./config');

let index = require('./routes/index');
let users = require('./routes/users');
let posts = require('./routes/posts');
let postsimages = require('./routes/postsimages');
let comments = require('./routes/comments');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Getting Models
const usermodel = require('./models/user');
const postsmodel = require('./models/post');
const postsimagesmodel = require('./models/postsimage');
const commentsmodel = require('./models/comment');

let usercreatetable = function() {
	usermodel.sync().then(()=> {
  		console.log("User Table Created");
  		postscreatetable();
  	}).catch(err=> {
  		console.log(err);
  		next(err);
  });
};
let postscreatetable = function() {
	postsmodel.sync().then(()=> {
		console.log("Posts Table Created");
		postsimagecreatetable();
		commentscreatetable();
	}).catch(err => {
		console.log(err);
		next(err);
	});
};
let postsimagecreatetable = function() {
	postsimagesmodel.sync().then(()=> {
		console.log("Posts Image Table Created");
	}).catch(err=> {
		console.log(err);
		next(err);
	});
};
let commentscreatetable = function() {
	commentsmodel.sync().then(()=> {
		console.log("Comments Table Created");
	}).catch(err=> {
		console.log(err);
		next(err);
	});
};

sequelize.authenticate().then(()=> {
	console.log("Successfully connected to the db!");
	usercreatetable();
})
.catch(err => {
	console.log(err);
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/postimages', postsimages);
app.use('/posts', posts);
app.use('/comments', comments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
