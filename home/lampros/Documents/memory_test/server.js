'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
  //res.send('Hello world\n');
  var memory_toreserve = 30;
  var out = reserveMemory(memory_toreserve);

  setTimeout(function(){ 
  res.send('Reserved: '+memory_toreserve+' MB');
  },5000
  );

});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);


function reserveMemory(amount){
	var mem_cont=[];
	
	for (var i=0; i<amount*100000; i++){
		mem_cont.push("1234567890");
	}

	return mem_cont;
	
}
