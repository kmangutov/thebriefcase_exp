var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('portfoliodb', server, {safe: true});

var table = 'linkedin';
var key = 'publicProfileUrl';

exports.getLinkedIn = function(req, res) {
	res.send({name: "name", job: "job one"});
}

exports.getAllLinkedIn = function(req, res) {
	db.collection(table, function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
}

exports.addLinkedIn = function(req, res) {
	var information = req.body;
	console.log('insert val: ' + information);

	db.collection(table, function(err, collection) {
		collection.insert(table, {safe: true}, function(err, result) {
			if(err) {
				res.send({'error':'error'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		})
	});
}

exports.add

