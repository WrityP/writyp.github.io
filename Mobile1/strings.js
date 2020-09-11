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
		let r = new RegExp(e,'g');
		line = line.replace(r,args[e]);
	});
	return line;
};

attack_strings = {};
miss_strings = {};
execute_strings = {};

attack_strings['basic_attack'] = [
	"A_name slashes at D_name, nicking D_possessive arm.",
	"A_name jumps on D_name's back and batters D_possessive head.",
	"D_name doesn't have time to dodge A_name's powerful blow. <i>CRACK!</i>"
];

miss_strings['basic_attack'] = [
	"A_name misses D_name by a long shot, A_subject doesn't look too pleased.",
	'"Stop moving, you coward!" A_name shouts at the top of A_possessive lungs.',
	"D_name expertly avoids A_name's blade."
];

execute_strings['basic_attack'] = [
	"A_name plunges A_possessive sword in D_name's heart, killing D_object instantly!",
	"A_name shoves A_possessive fist directly into D_name's belly and pulls out D_possessive guts!",
	'"Look into my eyes, I like to see the light go out," A_name whispers to D_name after breaking D_possessive neck.'
];

attack_strings['vampire_bite'] = [
	"A_name bites D_name, draining D_possessive life essence."
];

miss_strings['vampire_bite'] = [
	"A_name's teeth snap at nothing, D_name dodged."
];

execute_strings['vampire_bite'] = [
	"A_name rips out D_name's throat, drenching A_objectself in blood!"
];

defend_strings = [
	"D_name moves back and forth, becoming harder to hit.",
	"D_name gets a better handle on D_possessive shield.",
	"D_name inspects D_possessive surroundings, making the battlefield D_possessiv_p."
];