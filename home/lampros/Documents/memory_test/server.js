'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
  var memory_toreserve = 50;
  var out = reserveMemory(memory_toreserve);
  setTimeout(function(){
  	out = null;
	
	if (global.gc) {
    		global.gc();
	}else {
    		console.log('Garbage collection unavailable.  Pass --expose-gc '
      			+ 'when launching node to enable forced garbage collection.');
	}
  	res.send('Memory has been reserved');  
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
