characters_stylesheet = document.styleSheets[1];
characters = [];

defense_colors = ['black','#b87333','silver','gold','cyan'];

createSVG = function(path){
	let $c = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d=""></path></svg>');
	$c.find('path').attr('d',path);
	return $c;
};

scrollToBottom = function(){
	if($('#overall_container').height()<$('#inner_container').height()){
		$('#overall_container').animate({scrollTop:$('#inner_container').height()},0);
	}
}

player_form = {name:'the vampire villager',color:'gold',avatar:'./images/human0.png',gender:"feminine",max_hp:4,race:'vampire'};

orc_form = {name:'the orc warrior',avatar:'./images/orc0.png',color:'red',gender:'masculine',max_hp:6,race:'orc'};

goblin_form = {name:'the vampire bandit',avatar:'./images/vampire0.png',color:'violet',gender:'masculine',max_hp:2,defense:1,race:'vampire'};

/* Make conditions as an array and write an explanation for each, so that when a check turns out to be false, feedback is generated for the player. */

actions = {
	basic_attack:{
		path:paths.attack,
		type:'attack',
		valid_targets:function(){return this.id > 0 && this.hp > 0},
		on_success:function(target){target.take_damage(this.get_stat('strength'));},
		conditions:e=>true
	},
	vampire_bite:{
		path:paths.hearteater,
		type:'attack',
		valid_targets:function(){return this.id > 0 && this.hp > 0 && this.race !== "vampire"},
		on_success:function(target){target.take_damage(this.get_stat('strength'));this.heal(1);},
		conditions:function(){return this.race === 'vampire' && this.hp <= 2;}
	},
	dodge:{
		path:paths.shield,
		type:'self_buff',
		effect:function(){this.evasion += 10;},
		conditions:function(){return this.get_stat('evasion') < 30;}
	}
};

class Character {
	constructor(form){
		this.id = characters.length;
		this.name = form.name;
		this.race = (form.race)?form.race:'human';
		this.gender = (form.gender)?form.gender:'plural';
		this.avatar = form.avatar;
		this.color = (form.color)?form.color:'#'+(Math.random()*0xFFFFFF<<0).toString(16);
		this.affiliation = 'hostile';

		this.max_hp = (form.max_hp)?+form.max_hp:3;
		this.defense = (form.defense)?+form.defense:0;
		this.max_action_points = 2;
		this.action_points = 1;

		this.accuracy = 60;
		this.evasion = 0;
		this.strength = 1;

		this.bonus = {};
		this.possible_actions = {};

		this.hp = this.max_hp;

		this.style = {};
		this.create_style();

		this.triggers = {
			'damage_taken':{},
			'dealing_damage':{}
		};

		characters.push(this);
	}

	add_bonus(stat_name,bonus){
		if(!isInt(this[stat_name])){return false;}
		this.bonus[stat_name] = (this.bonus[stat_name])?Math.floor(this.bonus[stat_name]*1+bonus*1):bonus*1;
		return this.bonus[stat_name];
	}

	check_possible_actions(){
		this.possible_actions = {};
		for(let key in actions){
			if(actions[key].conditions.apply(this)){
				this.possible_actions[key] = actions[key];
			}
		}
	}

	create_style(){
		characters_stylesheet.insertRule('.ch'+this.id+' .name, .text .ch'+this.id+'{}',0);
		this.style.name = characters_stylesheet.cssRules[0].style;
		this.style.name.color = this.color;

		characters_stylesheet.insertRule('.ch'+this.id+' .avatar, .log_entry.ch'+this.id+'{}',0);
		this.style.log_entry = characters_stylesheet.cssRules[0].style;
		this.style.log_entry['border-color'] = this.color;

		return true;
	}

	create_target_div(){
		let $d = $('<div class="target ch'+this.id+'"><img class="avatar" src="'+this.avatar+'" /></div>');
		return $d;
	}

	die(){
		$('.ch'+this.id).addClass('dead');
		this.update_color('gray');
	}

	heal(amount){
		this.hp += amount;
		if(this.hp>this.max_hp){this.hp = this.max_hp;}

		return amount;
	}

	get_header(){
		let $p = $('<div class="log_header"><span class="name">'+this.name+'</span></div>');
		$p.append(createSVG(paths.dead).addClass('status death').css('fill','white'));
		for(let i = 0; i<this.max_hp; i++){
			$p.append(createSVG(paths.heart).addClass('status health').css('fill','white'));
		}
		$p.append(createSVG(paths.shield).addClass('status defense').css('fill','black'));
		return $p;
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

	get_stat(stat_name){
		if(!this[stat_name]){return false;}
		return (this.bonus[stat_name])?Math.floor(this[stat_name]*1+this.bonus[stat_name]*1):this[stat_name];
	}

	render_log(text){
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

	render_status(){
		if(this.hp < 1){
			this.die();
		}
		else{
			$('.ch'+this.id+' .health').css('fill','gray');
			$('.ch'+this.id).find('.health:lt('+Math.floor(this.hp)+')').css('fill','red');
			$('.ch'+this.id+' .defense').css('fill',defense_colors[Math.round(this.evasion/10)]);
		}
		return true;
	}

	start_turn(){
		this.bonus = {};
		this.action_points = this.max_action_points;
		this.check_possible_actions();
	}

	take_damage(amount){
		this.hp -= amount;

		return amount;
	}

	update_color(color){
		this.color = color;
		this.style.name.color = this.color;
		this.style.log_entry['border-color'] = this.color;
	}

	use_action(action_id, target){
		let a = actions[action_id];
		if(!a.conditions.apply(this)){return false;}
		if(a.type === "attack"){
			let chance_to_hit = Math.floor(this.get_stat('accuracy')-target.get_stat('evasion'));
			console.log(chance_to_hit);

			let log_arguments = jQuery.extend(this.get_line_object('A'),target.get_line_object('D'));
			let result_log_line = '';

			if(Math.random()>(1-chance_to_hit/100)){
				a.on_success.apply(this,[target]);
				if(target.hp>0){
					result_log_line = fill_log_line(attack_strings[action_id],log_arguments);
				}
				else{
					result_log_line = fill_log_line(execute_strings[action_id],log_arguments);
				}
			}
			else{
				result_log_line = fill_log_line(miss_strings[action_id],log_arguments);
			}

			this.render_log(result_log_line);
			target.render_status();
		}
		else if(a.type === "self_buff"){
			a.effect.apply(this);
			this.render_log(fill_log_line(defend_strings,this.get_line_object('D')));
		}
		this.action_points--;
		console.log(this.action_points);
	}
}

class Player extends Character{
	constructor(){
		super(player_form);
		this.affiliation = 'own';
		this.target;
	}

	attack(){
		super.attack(this.target);
		//if(this.target.hp < 1){attack_button.css('border-color','gray').css('fill','gray').unbind();}
		this.action_points--;
		if(this.action_points === 0){
			this.end_turn();
		}
	}

	defend(){
		super.defend();
		//if(this.defense>2){defend_button.css('border-color','gray').css('fill','gray').unbind();}
		this.action_points--;
		if(this.action_points === 0){
			this.end_turn();
		}
	}

	end_turn(){
		characters[1].use_action('basic_attack',player);
		characters[2].use_action('basic_attack',player);
		this.start_turn();
	}

	pick_target(action_id){
		$('#targets').empty().show();
		let p = this;
		for(let c_id in characters){
			let c = characters[c_id];
			if(this.possible_actions[action_id].valid_targets.apply(c)){
				c.create_target_div().on('click',function(){p.use_action(action_id,c);$('#targets').hide();}).appendTo('#targets');
			}
		}
		scrollToBottom();
	}

	prepare_actions(){
		this.check_possible_actions();
		let p = this;
		$('#actions').empty();
		for(let key in this.possible_actions){
			let $s = createSVG(this.possible_actions[key].path).addClass('action '+this.possible_actions[key].type).attr('id',key);
			if(this.possible_actions[key].type === "self_buff"){
				$s.on('click',function(){p.use_action(key);})
			}
			else if(this.possible_actions[key].type === "attack"){
				$s.on('click',function(){p.pick_target(key);})
			}
			$s.appendTo('#actions');
		}
	}

	start_turn(){
		super.start_turn();
		this.prepare_actions();
	}

	take_damage(amount){
		super.take_damage(amount);
		if(this.hp<1){
			$('#actions').hide();
		}
	}

	target_character(id){
		if(id != this.id){
			this.target = characters[id];
			if(this.target.hp > 0){
				//attack_button.css('border-color',this.target.color).css('fill','white').on('click',function(){player.attack()});
			}
			else{
				//attack_button.css('border-color','gray').css('fill','gray').unbind();
			}
			return true;
		}
		return false;
	}

	use_action(action_id, target){
		super.use_action(action_id, target);
		if(this.action_points>0){
			this.prepare_actions();
		}
		else{
			this.end_turn();
		}
	}
}

$(document).ready(function(){
	player = new Player();
	/*attack_button = createSVG('attack',paths.attack,'gray').css('border-color','gray').appendTo('#actions');
	defend_button = createSVG('defend',paths.shield,'white').appendTo('#actions').on('click',function(){player.defend();});*/

	new Character(orc_form);
	new Character(goblin_form);
	
	player.render_log('"I have finally found you, beast!"');
	characters[1].render_log('"Have you come to die as well, human?"');
	characters[2].render_log('<i>Something hideous jumps out of a nearby bush.</i><br/>"Do you want me to carve her up, boss?"');
	player.start_turn();
});