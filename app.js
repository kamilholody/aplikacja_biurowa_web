const createError = require('http-errors');
const cookieSession = require('cookie-session')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/config');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Connect Database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('We are connect with db!');
});

// Define Routes
const indexRouter = require('./routes/index');
const guestsRouter = require('./routes/guests');
const remindersRouter = require('./routes/reminders');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: config.keySession,
  maxAge: config.maxAgeSession
}));
app.use(methodOverride('_method'));


app.use(function (req, res, next) {
  res.locals.path = req.path;

  next();
});


app.use('/', indexRouter);
app.use('/guests', guestsRouter);
app.use('/reminders', remindersRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// Init Middleware

app.use(express.json({
  extended: false
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;