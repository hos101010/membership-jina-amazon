require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fileRouter = require('./routes/file');


var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));



app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'session_coockie_secret',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host     : '106.10.45.223',
    user     : 'user',
    password : '7979XxZz^',
    port     : 3306,
    database : 'mydb'
  })
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/files', fileRouter);




module.exports = app;
