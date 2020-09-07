String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

gender_pronouns = {
	'masculine':{'subject':'he','object':'him','possessive':'his','possessiv_p':'his'},
	'feminine':{'subject':'she','object':'her','possessive':'her','possessiv_p':'hers'},
	'plural':{'subject':'they','object':'them','possessive':'their','possessiv_p':'theirs'},
	'neutral':{'subject':'it','object':'it','possessive':'its','possessiv_p':'its'}
};

fill_log_line = function(library,args){
	let line = library.random();
	Object.keys(args).forEach(function(e){
		line = line.replaceAll(e,args[e]);
	});
	return line;
};

attack_strings = [
	"A_name slashes at D_name, nicking D_possessive arm.",
	"A_name jumps on D_name's back and batters D_possessive head.",
	"D_name doesn't have time to dodge A_name's powerful blow. <i>CRACK!</i>"
];

miss_strings = [
	"A_name misses D_name by a long shot, A_subject doesn't look too pleased.",
	'"Stop moving, you coward!" A_name shouts at the top of A_possessive lungs.',
	"D_name expertly avoids A_name's blade."
];

execute_strings = [
	"A_name plunges A_possessive sword in D_name's heart, killing D_object instantly!",
	"A_name shoves A_possessive fist directly into D_name's belly and pulls out D_possessive guts!",
	'"Look into my eyes, I like to see the light go out," A_name whispers to D_name after breaking D_possessive neck.'
]

defend_strings = [
	"D_name moves back and forth, becoming harder to hit.",
	"D_name gets a better handle on D_possessive shield.",
	"D_name inspects D_possessive surroundings, making the battlefield D_possessiv_p."
]