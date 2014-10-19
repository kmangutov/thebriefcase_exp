
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , linkedin = require('./routes/linkedin')
  , ejs = require('ejs');

var app = module.exports = express.createServer();

// Configuration




app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.register('html', require('ejs').renderFile);
  //  app.set('view engine', 'jade');
  app.set('view engine', 'ejs');
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

app.get('/:template/:key', function(req, res) {
	res.render('template',{key: req.params.key});
});

app.get('/api/linkedin/get/:name', linkedin.getLinkedIn);
app.post('/api/linkedin', linkedin.addLinkedIn);
app.get('/api/linkedin/all', linkedin.getAllLinkedIn);

app.get('/api/facebook/get/:name', linkedin.getFacebook);
app.post('/api/facebook', linkedin.addFacebook);
app.get('/api/facebook/all', linkedin.getAllFacebook);

app.get('/api/github/get/:name', linkedin.getGithub);
app.post('/api/github', linkedin.addGithub);
app.get('/api/github/all', linkedin.getAllGithub);


app.set('view options', {layout: false});
app.set('domain', '0.0.0.0');
app.listen(80, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
