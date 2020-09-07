String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

gender_pronouns = {
	'masculine':{'subject':'he','object':'him','possessive':'his','possessive_p':'his'},
	'feminine':{'subject':'she','object':'her','possessive':'her','possessive_p':'hers'},
	'plural':{'subject':'they','object':'them','possessive':'their','possessive_p':'theirs'},
	'neutral':{'subject':'it','object':'it','possessive':'its','possessive_p':'its'}
};

fill_log_line = function(library,args){
	let line = library.random();
	Object.keys(args).forEach(function(e){
		line = line.replace(e,args[e]);
	});
	return line;
}

attack_strings = [
	"A_name slashes at D_name, nicking D_possessive arm."
];

miss_strings = [
	"A_name misses D_name by a long shot, A_subject doesn't look too pleased."
];

execute_strings = [
	"A_name plunges A_possessive sword in D_name's heart, killing D_object instantly!"
]

defend_strings = [
	"D_name moves back and forth, becoming harder to hit."
]