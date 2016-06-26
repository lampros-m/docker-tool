'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
	res.send(appendPrimes(300000))
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);


function appendPrimes(maxNumber){
	var out = "";
	for (var i=1; i<=maxNumber; i++){
			if (isPrime(i)){
				out += i + "\n";			
			}
	}
	return out;
}

function isPrime(number){
	var i=2;
	var isPrime=true;
	while(i<=number/2 && isPrime===true){
		if (number%i===0){
			isPrime=false;
		}
		i++;	
	}
	return isPrime;	
}
