var express = require('express');
var http = require('http');
var app = express();
var path = require('path');

app.configure(function(){
	app.set('port', 8080);
	app.set("view options", {layout: false});

	app.set('views', path.join(__dirname, 'app/views'));
	app.use('/app/public/images',express.static(path.join(__dirname, 'app/public/images')));
	app.use('/app/public/js',express.static(path.join(__dirname, 'app/public/js')));
	app.use('/app/public/css',express.static(path.join(__dirname, 'app/public/css')));

	app.engine('html', require('ejs').renderFile);

	app.locals.pretty = true;
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'secret-secret' }));
	app.use(express.methodOverride());
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

require('./app/router')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
})
