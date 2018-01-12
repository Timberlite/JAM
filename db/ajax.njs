#!/usr/local/bin/node
var querystring = require('querystring');
var param = querystring.parse(process.env.QUERY_STRING);
setTimeout(() => {
  console.log('Content-type: text/plain; charset=utf-8\n');
  console.log('Your password is ' + param.password);
},500)
    
