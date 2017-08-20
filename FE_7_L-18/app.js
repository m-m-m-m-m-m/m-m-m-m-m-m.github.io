var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.bodyParser());
app.use(app.router);

require('routes')(app);

app.use(function(err, req, res, next) {
  if (app.get('env') == 'development') {
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  } else {
    res.send(500);
  }
});

http.createServer(app).listen(config.get('port'), function(){
  console.log('Express server listening on port ' + config.get('port'));
});

