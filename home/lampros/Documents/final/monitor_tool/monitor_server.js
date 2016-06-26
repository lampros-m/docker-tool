
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');

app.get('/', function (req, res) {
  res.send(fileToText(__dirname+'/main.html'));
});

app.get('/style.css', function (req, res) {
  res.send(fileToText(__dirname+'/style.css'));
});

app.get('/chart.js', function (req, res) {
  res.send(fileToText(__dirname+'/chart.js'));
});

app.get('/control.js', function (req, res) {
  res.send(fileToText(__dirname+'/control.js'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/docker_api', function (req, res) {
	//http://localhost:4243/containers/json

	var url_path = req.query.url_path;
	var methd = req.query.method;
	
	var params = req.query.extra;
    
   var options = {
	  host: 'localhost',
	  path: url_path,
	  //since we are listening on a custom port, we need to specify it by hand
	  port: '4243',
	  //This is what changes the request to a POST request
	  method: methd,
	  	  headers: {
    'Content-Type': 'application/json'
  },
	};

for(var k in params) {
	options[k]=params[k];
}



callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
  	    
  	  try{  	  	  
      res.send(JSON.parse(str));
  	  } catch(e){
  	  	  console.log(str);	
	      var err = {status:"ERROR",descr:str};
  	  	  res.send(err);
  	  }

  });
}

var req = http.request(options, callback);
//This is the data we are posting, it needs to be a string or a buffer
if (methd === 'POST'){
	var post = JSON.stringify(params);
} else
{
	var post = "TEST";	
}

if (post===undefined){
	post="";	
}
try{
req.write(post);
} catch (e){
	console.log(e);
var err = {status:"ERROR",descr:e};
req.write(e);
}

req.end();



});



function fileToText(fname){
	return fs.readFileSync(fname, 'utf8');
}