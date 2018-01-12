// Please install npm package mongoose first
const config = require('./config');
const mongoose = require('mongoose');

const url = `mongodb://${config.mongo.user}:${config.mongo.password}@localhost:27017/${config.mongo.dbname}` 

mongoose.connect(url, { useMongoClient: true }, (err, res) => {
	if (err) console.log('MongoDB connected failed');
	else console.log('MongoDB connected success');
});
mongoose.Promise = global.Promise;


const collectionName = 'AgeData';
const schema = new mongoose.Schema({
	name: String,
	age: Number
});

const model = mongoose.model(collectionName, schema);

model.find({name: 'TA'}).exec((err, results) => {
	if (err) console.log('Query failed');
	else {
		console.log(results);
	}
});
