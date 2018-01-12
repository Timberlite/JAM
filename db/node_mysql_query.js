// Please install npm package mysql first
const config = require('./config');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: config.mysql.user,
	password: config.mysql.password
});

connection.connect();

connection.query("SELECT * FROM `wp2017_ta`.`AgeData` WHERE `name`='test'", (err, rows, fields) => {
	if (err) console.log('MySQL query failed');
	else console.log('Results', rows[0]);
});
