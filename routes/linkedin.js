var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('0.0.0.0', 27017, {auto_reconnect: true});
db = new Db('portfoliodb', server, {safe: true});

var table = 'linkedin';
var key = 'publicProfileUrl';

db.open(function(err, db) {
	if(!err) {
		console.log("Connected to '" + table + "' database");
		db.collection(table, {strict:true}, function(err, collection) {
			if (err) {
				db.createCollection(table);
			}
		});
	}
});

exports.getLinkedIn = function(req, res) {
	res.send({name: "name", job: "job one"});
}

exports.getAllLinkedIn = function(req, res) {
	console.log('getAllLinkedIn called');

	db.collection(table, function(err, collection) {
		collection.find().toArray(function(err, items) {
			console.log('err:' + JSON.stringify(err) + ', items:' + JSON.stringify(items));
			res.send(items);
		});
	});
}

exports.addLinkedIn = function(req, res) {
	var information = {'hello': 'test'};//req.body;
	console.log('insert val: ' + JSON.stringify(information));

	db.collection(table, function(err, collection) {
		collection.insert(information, {safe: true}, function(err, result) {
			if(err) {
				res.send({'error':err});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		})
	});
}


