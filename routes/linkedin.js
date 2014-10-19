var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('0.0.0.0', 27017, {auto_reconnect: true});
db = new Db('portfoliodb', server, {safe: true});

var tableLinkedIn = 'table_linkedin';
var key = 'publicProfileUrl';

var uniqueName = '';
var uniqueNameKey = 'uniqueNameKey';

db.open(function(err, db) {
	if(!err) {
		db.collection(tableLinkedIn, {strict:true}, function(err, collection) {
			if (err) {
				db.createCollection(tableLinkedIn);
			}
		});
	}
});

exports.getLinkedIn = function(req, res) {
	var name = req.params.name;
	console.log('Retrieving linkedin data for ' + name);
	
	db.collection(tableLinkedIn, function(err, collection) {
		collection.findOne({uniqueNameKey: uniqueName}, function(err, item) {
			res.send(item);
		});
	});
}

exports.getAllLinkedIn = function(req, res) {
	
	db.collection(tableLinkedIn, function(err, collection) {
		collection.find().toArray(function(err, item) {
			res.send(item);
		});
	});
}

exports.addLinkedIn = function(req, res) {
	console.log('in addLinkedIn');
	console.log('addLinkedIn rest api called with ' + req.body);
	//var information = req.body;//JSON.parse(req.body);
	//////console.log('insert val: ' + JSON.stringify(information));

	var information = req.body;
	uniqueName = information["firstName"] + information["lastName"];
	information[uniqueNameKey] = uniqueName;

	db.collection(tableLinkedIn, function(err, collection) {
		collection.insert(/*information*/req.body, {safe: true}, function(err, result) {
			if(err) {
				res.send({'error':err});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		})
	});
}


