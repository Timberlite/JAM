// Please install npm package mysql first
const config = require('./config');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: config.mysql.user,
	password: config.mysql.password
});

connection.connect();

connection.query("INSERT INTO `wp2017_ta`.`AgeData` (`id`, `name`, `age`) VALUES ('0001', 'test', '18');");
