characters_stylesheet = document.styleSheets[1];
characters = [];

defense_colors = ['black','#b87333','silver','gold','cyan'];

createSVG = function(classes,path,fill='white',bonus="",bonus_fill="lightgreen",charges="",charges_fill="gold"){
	let $c = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d=""></path><text x="0" y="180" stroke="black" stroke-width="10" class="charges"></text><text x="300" y="480" stroke="black" stroke-width="10" class="bonus"></text></svg>');
	$c.addClass(classes).css('fill',fill).find('path').attr('d',path).parent().find('.bonus').text(bonus).css('fill',bonus_fill).parent().find('.charges').text(charges).css('fill',charges_fill);
	return $c;
};

scrollToBottom = function(){
	if($('#overall_container').height()<$('#inner_container').height()){
		$('#overall_container').animate({scrollTop:$('#inner_container').height()},0);
	}
}

player_form = {name:'the human villager',color:'gold',avatar:'./images/human0.png',gender:"feminine",max_hp:4};

orc_form = {name:'the orc warrior',avatar:'./images/orc0.png',color:'red',gender:'masculine',max_hp:6};

goblin_form = {name:'the goblin bandit',avatar:'./images/goblin0.png',color:'green',gender:'masculine',max_hp:2,defense:1};

class Character {
	constructor(form){
		this.id = characters.length;
		this.name = form.name;
		this.gender = (form.gender)?form.gender:'plural';
		this.avatar = form.avatar;
		this.color = (form.color)?form.color:'#'+(Math.random()*0xFFFFFF<<0).toString(16);
		this.affiliation = 'hostile';

		this.max_hp = (form.max_hp)?form.max_hp:3;
		this.defense = (form.defense)?form.defense:0;
		this.actions = 1;

		this.hp = this.max_hp;

		this.style = {};
		this.create_style();

		characters.push(this);
	}

	die(){
		$('.ch'+this.id).addClass('dead');
		this.update_color('gray');
	}

	create_style(){
		characters_stylesheet.insertRule('.ch'+this.id+' .name, .text .ch'+this.id+'{}',0);
		this.style.name = characters_stylesheet.cssRules[0].style;
		this.style.name.color = this.color;

		characters_stylesheet.insertRule('.log_entry.ch'+this.id+'{}',0);
		this.style.log_entry = characters_stylesheet.cssRules[0].style;
		this.style.log_entry['border-color'] = this.color;

		return true;
	}

	update_color(color){
		this.color = color;
		this.style.name.color = this.color;
		this.style.log_entry['border-color'] = this.color;
	}

	get_line_object(h){
		let line_object = {};
		line_object[h+'_name']='<span class="ch'+this.id+'">'+this.name+'</span>';
		line_object[h+'_subject']=gender_pronouns[this.gender]['subject'];
		line_object[h+'_object']=gender_pronouns[this.gender]['object'];
		line_object[h+'_possessive']=gender_pronouns[this.gender]['possessive'];
		line_object[h+'_possessiv_p']=gender_pronouns[this.gender]['possessiv_p'];
		return line_object;
	}

	render_log(text){
		$('#log').append("You're here!");
		if($('#log .log_entry:last-child').hasClass('ch'+this.id)){
			$('#log .log_entry:last-child').append($('<div class="text">'+text+'</div>'));
		}
		else{
			let $d = $('<div class="'+this.affiliation+' log_entry ch'+this.id+'"><img class="avatar" src="'+this.avatar+'"/></div>');
			$d.append(this.get_header());
			$d.append($('<div class="text">'+text+'</div>'));
			$('#log').append($d);
			let target_id = this.id;
			$d.on('click',function(){player.target_character(target_id);});
		}
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
		$p.append(createSVG('status defense',paths.shield,'black'));
		return $p;
	}

	render_status(){
		if(this.hp < 1){
			this.die();
		}
		else{
			$('.ch'+this.id+' .health').css('fill','gray');
			$('.ch'+this.id).find('.health:lt('+Math.floor(this.hp)+')').css('fill','red');
			$('.ch'+this.id+' .defense').css('fill',defense_colors[this.defense]);
		}
		return true;
	}

	defend(){
		if(this.defense<3){
			this.defense++
			this.render_log(fill_log_line(defend_strings,this.get_line_object('D')));
			return true;
		}
		else{
			return false;
		}
	}

	attack(target, technique='none'){
		if(this.hp<1 || target.hp<1){return false;}

		let result;
		let damage = 1;
		let accuracy = Math.floor(60-target.defense*16);
		console.log((1-accuracy/100));

		let log_arguments = jQuery.extend(this.get_line_object('A'),target.get_line_object('D'));
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
		this.target;
	}

	take_damage(amount){
		super.take_damage(amount);
		if(this.hp<1){
			$('#actions').hide();
		}
	}

	attack(){
		super.attack(this.target);
		if(this.target.hp < 1){attack_button.css('border-color','gray').css('fill','gray').unbind();}
		this.actions--;
		if(this.actions === 0){
			this.end_turn();
		}
	}

	defend(){
		super.defend();
		if(this.defense>2){defend_button.css('border-color','gray').css('fill','gray').unbind();}
		this.actions--;
		if(this.actions === 0){
			this.end_turn();
		}
	}

	target_character(id){
		if(id != this.id){
			this.target = characters[id];
			if(this.target.hp > 0){
				attack_button.css('border-color',this.target.color).css('fill','white').on('click',function(){player.attack()});
			}
			else{
				attack_button.css('border-color','gray').css('fill','gray').unbind();
			}
			return true;
		}
		return false;
	}

	start_turn(){
		console.log("hey");
		this.actions = 2;
		if(characters[1].hp > 0 || characters[2].hp > 0){
		}
	}

	end_turn(){
		characters[1].attack(player);
		characters[2].attack(player);
		this.start_turn();
	}
}

$(document).ready(function(){
	player = new Player();
	attack_button = createSVG('attack',paths.attack,'gray').css('border-color','gray').appendTo('#actions');
	defend_button = createSVG('defend',paths.shield,'white').appendTo('#actions').on('click',function(){player.defend();});

	new Character(orc_form);
	new Character(goblin_form);
	player.render_log('"I have finally found you, beast!"');
	characters[1].render_log('"Have you come to die as well, human?"');
	characters[2].render_log('<i>Something hideous jumps out of a nearby bush.</i><br/>"Do you want me to carve her up, boss?"');
	player.start_turn();
});