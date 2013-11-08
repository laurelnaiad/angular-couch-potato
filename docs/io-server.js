var express = require('express');
var app = express();

app.use('/angular-couch-potato/', function(req, res) {
  res.sendfile('dist/' + req.path, {root: __dirname + '/..'});
});

app.listen(3000); //the port you want to use
