var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('0.0.0.0', 27017, {auto_reconnect: true});
db = new Db('portfoliodb', server, {safe: true});

var tableLinkedIn = 'table_linkedin';
var tableFacebook = 'table_facebook';
var tableGithub = 'table_github';

var uniqueName = '';
var uniqueNameKey = 'uniqueNameKey';

db.open(function(err, db) {
	if(!err) {
		db.collection(tableLinkedIn, {strict:true}, function(err, collection) {
			if (err) {
				db.createCollection(tableLinkedIn);
				db.createCollection(tableFacebook);
				db.createCollection(tableGithub);
			}
		});
	}
});

////////////////
exports.getGithub = function(req, res) {
	var name = req.params.name;
	console.log('Retrieving github data for ' + name);
	
	db.collection(tableGithub, function(err, collection) {
		collection.findOne({uniqueNameKey: name}, function(err, item) {
			res.send(item);
		});
	});
}


exports.addGithub = function(req, res) {
	console.log('in addGithub');
	console.log('addGithub rest api called with ' + req.body);

	

	db.collection(tableGithub, function(err, collection) {
		collection.insert(req.body, function(err, result) {
			if(err) {
				res.send({'error':err});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				//res.send(result[0]);
				res.send(uniqueName);
			}
		})
	});
}


exports.getAllGithub = function(req, res) {
	
	db.collection(tableGithub, function(err, collection) {
		collection.find().toArray(function(err, item) {
			res.send(item);
		});
	});
}


/////////////////////////////////////

////////////////
exports.getFacebook = function(req, res) {
	var name = req.params.name;
	console.log('Retrieving facebook data for ' + name);
	
	db.collection(tableFacebook, function(err, collection) {
		collection.findOne({uniqueNameKey: name}, function(err, item) {
			res.send(item);
		});
	});
}


exports.addFacebook = function(req, res) {
	console.log('in addFacebook');
	console.log('addFacebook rest api called with ' + req.body);

	

	db.collection(tableFacebook, function(err, collection) {
		collection.insert(req.body, function(err, result) {
			if(err) {
				res.send({'error':err});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				//res.send(result[0]);
				res.send(uniqueName);
			}
		})
	});
}


exports.getAllFacebook = function(req, res) {
	
	db.collection(tableFacebook, function(err, collection) {
		collection.find().toArray(function(err, item) {
			res.send(item);
		});
	});
}


/////////////////////////////////////

exports.getLinkedIn = function(req, res) {
	var name = req.params.name;
	console.log('Retrieving linkedin data for ' + name);
	
	db.collection(tableLinkedIn, function(err, collection) {
		collection.findOne({uniqueNameKey: name}, function(err, item) {
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

	var information = req.body;
	uniqueName = information["firstName"] + information["lastName"];
	information[uniqueNameKey] = uniqueName;

	
	db.collection(tableLinkedIn, function(err, collection) {
		collection.update({uniqueNameKey:uniqueName},req.body, {upsert:true}, function(err, result) {
			if(err) {
				res.send({'error':err});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				//res.send(result[0]);
				res.send(uniqueName);
			}
		})
	});
}


