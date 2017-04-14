var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require("./webpack.config");
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var compiler = webpack(config);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use(webpackMiddleware(compiler));
app.get('/test', function(req, res, next) {
    res.render('test', {
        title: '这是测试页面',
        file: "test_" + (req.query.file || "clone")
    });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
module.exports = app;
