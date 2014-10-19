
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , linkedin = require('./routes/linkedin');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});



// Routes

//app.get('/', routes.index);
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/api/linkedin', linkedin.getAllLinkedIn);
app.post('/api/linkedin', linkedin.addLinkedIn);


app.set('view options', {layout: false});
app.set('domain', '0.0.0.0');
app.listen(8080, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
