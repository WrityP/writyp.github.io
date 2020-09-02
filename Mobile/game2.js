var the_ui, the_player, the_opponent, the_game,opponent_catalogue;

Array.prototype.random = function(){
	return this[Math.floor(Math.random()*this.length)];
}


class Catalogue {
	constructor(data){
		console.log(data);
		this.array = (data instanceof Array);
		this.data = data;
	}
	random(level=0){
		if(this.array)
			{return this.data[level][Object.keys(this.data[level]).random()];}
		else
			{return this.data[Object.keys(this.data).random()];}
	}
}

class Game{
	constructor(){
		opponent_catalogue = new Catalogue(opponent_data);
		the_ui = new UI();
		the_player = new Player();
		the_opponent = new Opponent(opponent_catalogue.random(0));

		$('#player_screen .actions svg.active').on('click',function(){
			the_player.setAction($(this).attr('id'),the_opponent);
		});
		$('#player_screen .rewards svg.active').on('click',function(){
			the_player.pickReward(rewards[$(this).attr('id')]);
			the_opponent = new Opponent(opponent_catalogue.random(1));;
		});
	}
	resolveRound(){
		for(let i=0;i<3;i++){
			console.log(the_player.actions[i]+" vs "+the_opponent.actions[i]);
			$('#'+the_opponent.id+i+' path').attr('d',actions[the_opponent.actions[i]].path);
			if(!actions[the_player.actions[i]].nullify.includes(the_opponent.actions[i]))
				{
					the_player.takeDamage(actions[the_opponent.actions[i]].damage+the_opponent.damage);
					the_ui.changeSVGColor(the_opponent.id+i,'green');
				}
			else
				{
					the_ui.changeSVGColor(the_opponent.id+i,'green');
				}
			if(!actions[the_opponent.actions[i]].nullify.includes(the_player.actions[i]))
				{
					the_opponent.takeDamage(actions[the_player.actions[i]].damage+the_player.damage);
					the_ui.changeSVGColor(the_player.id+i,'green');
				}
			else
				{
					the_ui.changeSVGColor(the_player.id+i,'red');
				}
		}
		the_ui.updateHP(the_player.id,the_player.hp,the_player.getHPpercentage());
		the_ui.updateHP(the_opponent.id,the_opponent.hp,the_opponent.getHPpercentage());
	}
}

class UI{
	constructor(){

	}
	updateHP(id,value,percentage){
		$('#'+id+"_screen .health_bar span").text(value);
		$('#'+id+"_screen .health_bar div").css('height',percentage);
	}
	createSVG(id,path,fill='white',bonus="",bonus_fill="lightgreen",charges="",charges_fill="gold"){
		let $c = $('#models .model_svg').clone();
		$c.attr('id',id).css('fill',fill).find('path').attr('d',path).parent().find('.bonus').text(bonus).css('fill',bonus_fill).parent().find('.charges').text(charges).css('fill',charges_fill);
		return $c;
	}
	addPlayerAction(action_id){
		$("#player_screen .actions").append(this.createSVG(action_id,actions[action_id].path,'white').addClass('active'));
	}
	addPlayerReward(reward_id){
		$("#player_screen .rewards").append(this.createSVG(reward_id,rewards[reward_id].path,'white').addClass('active'));
	}
	addPlayerPassive(id,path,fill,text,text_fill){
		$("#player_screen .actions").append(this.createSVG(id,path,fill,text,text_fill).addClass('passive'));
	}
	clearOpponentPassives(){
		$("#opponent_screen .actions").empty();
	}
	addOpponentPassive(id,path,fill,text,text_fill){
		$("#opponent_screen .actions").append(this.createSVG(id,path,fill,text,text_fill));
	}
	addToNarrative(string,color="white"){
		$("#narrative").append('<span style="color:'+color+';">'+ string+'<br>');
	}
	swapScreens(screen1,screen2){
		$(screen1).fadeOut(100);
		$(screen2).fadeIn(100);
	}
	setName(id,name){
		$('#'+id+'_screen h1').text(name);
	}
	switchMiddleSVG(path,fill){
		$('#middle_screen svg').css('fill',fill).find('path').attr('d',path);
	}
	changeSVGColor(id,color){
		$('#'+id).css('fill',color);
	}
}

class Character {
	constructor(id,character_type){
		this.id = id;
		this.damage = character_type.damage;
		this.max_hp=character_type.hp;
		this.hp=this.max_hp;
		the_ui.updateHP(this.id,this.hp,this.getHPpercentage());
		this.actions = [];
		this.description = character_type.description;
		this.name = character_type.name;
	}
	getHPpercentage(){
		return Math.round(100-this.hp/this.max_hp*100)+"%";
	}
	takeDamage(damage){
		this.hp-=damage;
		if(this.hp<0){this.hp = 0;} // Cap HP at 0
	}
	introduce(){
		the_ui.setName(this.id,this.name);
		the_ui.addToNarrative(this.description);
	}
}

class Player extends Character{
	constructor(){
		super('player',player_type);
		this.clock = 0;
		this.level = 1;
		this.actions = player_type.actions;

		this.initiateActions();
		this.initiateRewards();
		this.introduce();
	}
	initiateActions(){
		this.actions.forEach(function(e){
			the_ui.addPlayerAction(e);
		});
	}
	initiateRewards(){
		reward_keys.forEach(function(e){
			the_ui.addPlayerReward(e);
		});
	}
	setAction(action,adversary){
		if(this.hp<1 ||adversary.hp<1){return false;}
		
		if(this.clock == 0){
			adversary.setBehavioralActions();
			$('.player_action').css('fill','black');
		}
		this.actions.push(action);
		$('#'+this.id+this.clock).css('fill','white').find('path').attr('d',actions[action].path);
		this.clock++;
		if(this.clock == 3){
			the_game.resolveRound();
			this.actions = [];
			this.clock = 0;
		}
		if(this.hp<1){
			the_ui.switchMiddleSVG(paths.skull,'violet');
			the_ui.addToNarrative("Your vision fades...",'violet');
		}
		else if(adversary.hp<1){
			the_ui.switchMiddleSVG(paths.skullmedal,'gold');
			if(this.level == 1){
				the_ui.addToNarrative("You have vanquished your foe!",'green');
				the_ui.swapScreens("#player_screen .actions","#player_screen .rewards");
			}
			else{
				the_ui.addToNarrative("The crowd cheers as you are declared champion of the arena!",'gold');
			}
		}
	}
	pickReward = function(reward){
		if(the_opponent.hp>0){return false;}
		the_ui.swapScreens("#player_screen .rewards","#player_screen .actions");
		this[reward.bonus_type]+=Math.round(reward.bonus_score);
		if(reward.bonus_type == 'damage'){the_ui.addPlayerPassive('strength',paths.strength,'lightgreen','+1','lightgreen');}
		this.hp = this.max_hp;
		this.level++;
		the_ui.updateHP(this.id,this.hp,this.getHPpercentage());
		the_ui.addToNarrative(reward.description);
	}
}

class Opponent extends Character{
	constructor(opponent_type){
		super("opponent",opponent_type);
		
		this.behavior = behaviors[opponent_type.behaviors.random()];
		this.description=opponent_type.description+' '+this.behavior.description;
		this.name = this.behavior.title + ' ' +this.name;
		the_ui.clearOpponentPassives();
		if(this.damage>0)
			{the_ui.addOpponentPassive('strength',paths.strength,'lightgreen','+'+this.damage,'lightgreen');}

		this.introduce();
	}
	setBehavioralActions(){
		this.actions = [];
		$('.opponent_action').css('fill','black');
		for(let i=0;i<3;i++){
			this.actions.push(this.behavior.actions[i].random());
		}
		console.log(this.actions);
	}
}

rewards = {/*
	maxhealth:{
		name:"Heart-eater",
		path:paths.hearteater,
		fill:'red',
		bonus_type:"max_hp",
		bonus_score:"5",
		description:"You devour your opponent's heart and feel their lifeforce pulsing through your flesh."
	},*/
	damage:{
		name:"Scavenger",
		path:paths.gear,
		fill:'gold',
		bonus_type:"damage",
		bonus_score:"1",
		description:"They won't need their weapons anymore, you, on the other hand, have more killing to do."
	}
};

reward_keys = Object.keys(rewards);

player_type = {
	name:"You",
	behaviors:[],
	hp:20,
	description:"You enter the blood-soaked circle of sand.",
	damage:0,
	action_points:3,
	actions:['attack','feint','parry','dodge']
}

$(document).ready(function(){
	the_game = new Game();
});