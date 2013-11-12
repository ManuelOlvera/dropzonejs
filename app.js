var express = require('express');
var dropzone = require('./routes/dropzone');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));

// to allow upload of files, saving them into /files
app.use(express.bodyParser({ keepExtensions: true}));

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', dropzone.index);

app.post('/file-upload', function(req, res){
	var result = dropzone.fileUpload(req, res, fs, __dirname);
	console.log(result);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
