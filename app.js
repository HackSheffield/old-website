const express = require('express');
const { resolve } = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const postcssMiddleware = require('postcss-middleware');

const debug = require('debug')('hs:app');

const app = express();

// view engine setup
app.set('views', resolve('views'));
app.set('view engine', 'pug');

// middleware setup and use
// uncomment after placing your favicon in /src
// app.use(favicon(resolve('src', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(resolve('src')));

// load and set up routes
const { router: index } = require('./routes/index');

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app };
