characters = [];

createSVG = function(classes,path,fill='white',bonus="",bonus_fill="lightgreen",charges="",charges_fill="gold"){
	let $c = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d=""></path><text x="0" y="180" stroke="black" stroke-width="10" class="charges"></text><text x="300" y="480" stroke="black" stroke-width="10" class="bonus"></text></svg>');
	$c.addClass(classes).css('fill',fill).find('path').attr('d',path).parent().find('.bonus').text(bonus).css('fill',bonus_fill).parent().find('.charges').text(charges).css('fill',charges_fill);
	return $c;
};

scrollToBottom = function(){
	if($('#overall_container').height()<$('#inner_container').height()){
		$('#overall_container').animate({scrollTop:$('#inner_container').height()},'slow');
	}
}

player_form = {name:'The Human Villager',color:'gold',avatar:'./images/human0.png'};

orc_form = {name:'The Orc Warrior',avatar:'./images/orc0.png',color:'red'};

attack_strings = [
	"ATTACKER slashes at DEFENDANT, nicking their arm.",
	"ATTACKER rams their shoulder into DEFENDANT's chest.",
	"DEFENDANT's vision blur after receiving a mean uppercut from ATTACKER."
];

miss_strings = [
	"ATTACKER misses DEFENDANT by a long shot.",
	"DEFENDANT barely manages to deflect ATTACKER's blade.",
	"DEFENDANT and ATTACKER meet in a clash of swords, but neither is wounded."
];

execute_strings = [
	"ATTACKER plunges their sword in DEFENDANT's heart, killing them instantly!",
	"DEFENDANT's head flies off into a nearby tree after receiving a powerful blow from ATTACKER!"
]

fill_log_line = function(library,args){
	line = library.random();
	Object.keys(args).forEach(function(e){
		console.log(args[e]);
		line = line.replace(e,args[e]);
	});
	return line;
}

class Character {
	constructor(form){
		this.id = characters.length;
		this.name = form.name;
		this.avatar = form.avatar;
		this.color = (form.color)?form.color:'#'+(Math.random()*0xFFFFFF<<0).toString(16);
		this.affiliation = 'hostile';

		this.max_hp = 5;

		this.hp = this.max_hp;

		characters.push(this);
	}

	render_log(text){
		let $d = $('<div class="'+this.affiliation+' log_entry ch'+this.id+'"><img class="avatar" src="'+this.avatar+'"/></div>');
		$d.append(this.get_header());
		$d.append($('<div class="text">'+text+'</div>'));
		$('#log').append($d);
		$('.ch'+this.id).css('border-color',this.color).find('.name').css('color',this.color);
		this.render_status();
		scrollToBottom();
		return true;
	}

	get_header(){
		let $p = $('<div class="log_header"><span class="name">'+this.name+'</span></div>');
		$p.append(createSVG('status death',paths.dead,'white'));
		for(let i = 0; i<this.max_hp; i++){
			$p.append(createSVG('status health',paths.heart,'white'));
		}
		return $p;
	}

	render_status(){
		if(this.hp < 1){
			$('.ch'+this.id).addClass('dead');
		}
		else{
			$('.ch'+this.id+' .health').css('fill','gray');
			$('.ch'+this.id).find('.health:lt('+Math.floor(this.hp)+')').css('fill','red');
			console.log('.ch'+this.id+' .health:lt('+Math.floor(this.hp)+')');
		}

		return true;
	}

	attack(target, technique='none'){
		if(this.hp<1 || target.hp<1){return false;}

		let result;
		let damage = 1;
		let accuracy = 60;

		let log_arguments = {'ATTACKER':this.name,'DEFENDANT':target.name};
		let result_log_line = '';

		if(result = Math.random()>(1-accuracy/100)){
			target.take_damage(damage);
			if(target.hp>0){
				result_log_line = fill_log_line(attack_strings,log_arguments);
			}
			else{
				result_log_line = fill_log_line(execute_strings,log_arguments);
			}
		}
		else{
			result_log_line = fill_log_line(miss_strings,log_arguments);
		}

		this.render_log(result_log_line);
		target.render_status();
		
		return result;
	}

	take_damage(amount){
		this.hp -= amount;

		return amount;
	}
}

class Player extends Character{
	constructor(){
		super(player_form);
		this.affiliation = 'own';
	}

	take_damage(amount){
		super.take_damage(amount);
		if(this.hp<1){
			$('#actions').hide();
		}
	}
}

$(document).ready(function(){
	player = new Player();
	new Character(orc_form);
	$('#actions').append(createSVG('attack',paths.attack,'white'));
	$('#actions svg').on('click',function(){
		player.attack(characters[1]);
		characters[1].attack(player);
	});
});