let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let logger = require('morgan');

require('./APP_API/models/db');
let apiRouter = require('./APP_API/router/index');

let app = express();

app.use(logger('dev'));
app.use(express.json());

// changing to true
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

//app.use(express.static(path.join(__dirname,'public', 'src')));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
