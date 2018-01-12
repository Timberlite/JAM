const config = require('./config');
const mongoose = require('mongoose');

const url = 'mongodb://'+config.mongo.user+':'+config.mongo.password+'@localhost:27017/'+config.mongo.dbname; 

mongoose.connect(url, { useMongoClient: true }, (err, res) => {
  console.log('Content-type: text/plain; charset=utf-8\n');
  console.log('test');
//  if (err) {
//    console.log('Content-type: text/plain; charset=utf-8\n');
//    console.log('MongoDB connected failed');
//  }
});

//mongoose.Promise = global.Promise;
//
//const collectionName = 'users';
//const schema = new mongoose.Schema({
//  name: String,
//  email: String,
//  password: String
//});
//
//const model = mongoose.model(collectionName, schema);
//
//var querystring = require('querystring');
//var param = querystring.parse(process.env.QUERY_STRING);
//
//model.find({name: param.email}).exec((err, results) => {
//  console.log('Content-type: text/plain; charset=utf-8\n');
//	if (err) console.log('Query failed');
//	else {
//		console.log(results);
//	}
//});
