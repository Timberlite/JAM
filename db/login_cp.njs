#!/usr/local/bin/node
const config = require('./config');
const mongoose = require('mongoose');

const url = `mongodb://${config.mongo.user}:${config.mongo.password}@localhost:27017/${config.mongo.dbname}` 

console.log('test');

mongoose.connect(url, { useMongoClient: true }, (err, res) => {
  if (err) console.log('MongoDB connected failed');
  else console.log('MongoDB connected success');
});
mongoose.Promise = global.Promise;

const collectionName = 'users';
const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const model = mongoose.model(collectionName, schema);

var querystring = require('querystring');
var param = querystring.parse(process.env.QUERY_STRING);

model.find({name: param.email}).exec((err, results) => {
	if (err) console.log('Query failed');
	else {
		console.log(results);
	}
});

