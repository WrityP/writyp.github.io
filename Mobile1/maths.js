const gcd = (a, b) => a ? gcd(b % a, a) : b; // Greatest common divisor

const lcm = (a, b) => a * b / gcd(a, b); // Lowest common multiple

// [11,20,15].reduce(lcm);

Array.prototype.random = function(){
  return this[Math.floor(Math.random()*this.length)];
}

var operators = {
	'<': function(a, b) { return a < b; },
	'<=': function(a, b) { return a <= b; },
	'=': function(a, b) { return a == b; },
	'>': function(a, b) { return a > b; },
	'>=': function(a, b) { return a >= b; }
};

function isInt(value){
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function random_color(){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}