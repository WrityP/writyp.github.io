defeat_path = "M220.09 25.297c-34.308 4.9-67.18 17.336-94.668 37.256l69.03 139.824-109.487-99.363c-28.304 39.302-42.5 93.27-31.61 163.675l15.22 94.37 70.474-13.275 3.458 18.365-15.444 2.91 44.65 127.653H197.2l-7.827-62.03 18.533-2.34 8.123 64.37h29.72V431.22h18.688v65.493h29.724l8.12-64.37 18.536 2.34-7.828 62.03h25.578l44.465-127.135-18.195-3.428 3.46-18.365 70.362 13.252 18.28-94.455c10.763-69.744-3.717-123.52-32.372-162.865l-108.713 98.66L384.36 63.613c-27.52-20.056-60.386-32.763-94.653-37.982l-34.52 164.485L220.09 25.297zm-92.182 192.266c4.232.063 8.63.81 13.186 2.208-7.603 6.918-12.375 16.89-12.375 27.978 0 20.887 16.93 37.816 37.813 37.816 15.928 0 29.548-9.85 35.12-23.793l29.136 22.365-81.8 26.383-.226.062c-15.9 4.26-30.327.71-40.15-7.498-9.82-8.21-15.218-20.12-17.12-32.207-1.902-12.086-.44-24.64 5.342-35.068 5.78-10.43 17.11-18.454 31.072-18.244zm216.53 16.656c-1.612 4.2-2.502 8.76-2.502 13.528 0 20.887 16.93 37.816 37.814 37.816s37.814-16.93 37.814-37.816c0-.565-.018-1.125-.043-1.684 2.2 7.927 2.488 16.48 1.177 24.81-1.902 12.087-7.3 24-17.12 32.208-9.823 8.21-24.248 11.76-40.15 7.498l-.226-.062-81.8-26.383 65.038-49.916zm-89.21 57.173l40.026 101.834-17.07 7.064-22.957-35.558-22.957 35.56-17.66-7.065 40.617-101.834z";
win_path = "M248.563 20.844c-43.486.112-87.294 4.423-131.563 13.843v53.97c93.527-27.524 193.554-20.19 277.844.75V34.968c-45.613-8.42-91.43-13.623-137.594-14.095-2.896-.03-5.788-.04-8.688-.03zm-3.657 68.5c-12.22.072-24.497.58-36.75 1.562V289.47c14.508-5.86 30.758-9.126 47.78-9.126 16.62 0 32.512 3.09 46.75 8.687l.002-196.936c-17.3-1.715-34.878-2.678-52.563-2.75-1.744-.007-3.473-.01-5.22 0zm-55.437 3.47c-14.55 1.76-29.064 4.18-43.407 7.436v180.72l33.156 25.467c3.22-2.642 6.652-5.084 10.25-7.375V92.813zm131.905 1.436v204.156c3.657 2.274 7.125 4.74 10.406 7.375l31.033-24.75V101.126c-13.522-2.72-27.365-5.028-41.438-6.875zm-65.438 204.78c-50.672 0-89.812 32.778-89.812 70.75 0 24.138 15.838 46.124 40.375 58.97l-17.406 60.156 17.937 5.188 12.47-43.03 24.53-.002v44.813h18.69v-44.813h25.06l12.47 43.032 17.938-5.188-16.813-58.156c26.797-12.478 44.344-35.544 44.344-60.97 0-37.972-39.11-70.75-89.783-70.75zm-55.343 41.033l44 48.406-52.063-6.94 8.064-41.467zm109.72 0l8.06 41.468-52.062 6.94 44-48.408zm-55.69 61.687l15.064 29.47h-30.125l15.062-29.47z";

player = {
	name:"Player",
	hp:10,
};

opponent = {
	name:"Opponent",
	hp:10
};

actions = {
	attack:{
		nullify:['feint'],
		damage:3,
		path:'M45.95 14.553c-19.38.81-30.594 11.357-30.282 30.283l19.768 30.78c4.43-1.213 9.36-3.838 14.248-7.335l42.474 59.935c-17.018 20.83-31.258 44.44-42.71 70.836l26.55 26.552c11.275-23.6 24.634-44.826 39.918-63.864l210.82 297.475 166.807 33.213L460.33 325.62 162.78 114.745c19.907-16.108 41.842-29.91 65.652-41.578l-26.553-26.55c-27.206 11.803-51.442 26.576-72.735 44.292L69.39 48.56c3.443-4.823 6.062-9.735 7.342-14.242l-30.78-19.765zm400.84 86.933v.008l.003-.008h-.002zm0 .008l-28.028 124.97-25.116-80.593-18.105 70.667-26.862-49.64-.584 57.818 128.484 91.69 15.184 87.017-1.168-186.885-34.457 39.713-9.346-154.756zm-300.95 27.98l222.224 196.368 25.645 66.75-66.75-25.645L130.6 144.734c4.91-5.278 9.995-10.36 15.238-15.26zm32.305 196.274v.004h.005l-.005-.004zm.005.004l28.028 22.775-36.21 4.088 57.82 19.272-105.706 4.09 115.05 27.45L136.1 422.114l127.316 25.696-67.164 43.803 208.494 1.752-87.017-15.185-104.54-150.676-35.037-1.752z'
	},
	feint:{
		nullify:['parry','feint'],
		damage:2,
		path:'M237.688 20.25L18.344 288.344l174.625 63.094c-8.217 8.152-18.068 15.154-29.876 20.78L276.5 399.282c-10.966 11.894-24.456 22.08-41 30.22l125.563 12.406c-16.877 21.158-38.8 38.795-67.063 52.03l204.688-29.623L412.5 273.125c-1.632 34.214-5.993 66.51-14.688 95.813L320 270.03c-1.03 21.615-3.57 42.188-8.438 61.22l-80.843-72.47c-1.363 11.97-3.38 23.5-6.25 34.408l-45.94-28.657L496.69 20.25h-90.75l-284.72 250.844 158.313 87.03-211.655-76.78L318.5 20.25h-80.813z'
	},
	parry:{
		nullify:['attack','parry'],
		damage:2,
		path:'M311.313 25.625l-23 10.656-29.532 123.032 60.814-111.968-8.28-21.72zM59.625 50.03c11.448 76.937 48.43 141.423 100.188 195.75 14.133-9.564 28.405-19.384 42.718-29.405-22.156-27.314-37.85-56.204-43.593-86.28-34.214-26.492-67.613-53.376-99.312-80.064zm390.47.032C419.178 76.1 386.64 102.33 353.31 128.22c-10.333 58.234-58.087 112.074-118.218 158.624-65.433 50.654-146.56 92.934-215.28 121.406l-.002 32.78c93.65-34.132 195.55-81.378 276.875-146.592C375.72 231.06 435.014 151.375 450.095 50.063zm-236.158 9.344l-8.5 27.813 40.688 73.06-6.875-85.31-25.313-15.564zm114.688 87.813C223.39 227.47 112.257 302.862 19.812 355.905V388c65.917-27.914 142.58-68.51 203.844-115.938 49.83-38.574 88.822-81.513 104.97-124.843zm-144.563 2.155c7.35 18.89 19.03 37.68 34 56.063 7.03-4.98 14.056-10.03 21.094-15.094-18.444-13.456-36.863-27.12-55.094-40.97zM352.656 269.72c-9.573 9.472-19.58 18.588-29.906 27.405 54.914 37.294 117.228 69.156 171.906 92.156V358.19c-43.86-24.988-92.103-55.13-142-88.47zm-44.906 39.81c-11.65 9.32-23.696 18.253-36.03 26.845C342.046 381.51 421.05 416.15 494.655 442.75v-33.22c-58.858-24.223-127.1-58.727-186.906-100zm-58.625 52.033l-46.188 78.25 7.813 23.593 27.75-11.344 10.625-90.5zm15.844.812L316.343 467l36.47 10.28-3.533-31.967-84.31-82.938z'
	}
}

action_keys = Object.keys(actions);

var initiate_actions = function(){
	action_keys.forEach(function(e){
		$c = $('#models .model_svg').clone();
		$c.attr('id',e).find('path').css('fill','white').attr('d',actions[e].path);
		$("#player_screen .actions").append($c);
		console.log($c);
	});
}

var Character = function(id){
	this.id = id;
	this.screen='#'+id+'_screen';
	this.max_hp=20;
	this.hp=20;
	this.updateHP();
	this.actions = [];
	this.clock = 0;
}

Character.prototype.updateHP = function(){
	if(this.hp<0){this.hp = 0;}
	newheight=Math.round(100-this.hp/this.max_hp*100)+"%";
	console.log(newheight);
	$(this.screen+" .health_bar div").css('height',newheight);
}

Character.prototype.setRandomActions = function(){
	this.actions = [];
	for(i=0;i<3;i++){
		$('#'+this.id+i+' path').css('fill','black');
		this.actions.push(action_keys[Math.floor(Math.random()*action_keys.length)]);
	}
	console.log(this.actions);
}

Character.prototype.actAgainst = function(adversary){
	for(i=0;i<3;i++){
		console.log(this.actions[i]+" vs "+adversary.actions[i]);
		$('#'+adversary.id+i+' path').attr('d',actions[adversary.actions[i]].path);
		if(!actions[this.actions[i]].nullify.includes(adversary.actions[i]))
			{
				this.hp-=actions[adversary.actions[i]].damage;console.log("Player loses "+actions[adversary.actions[i]].damage+" HP.");
				$('#'+adversary.id+i+' path').css('fill','green');
			}
		else
			{
				$('#'+adversary.id+i+' path').css('fill','red');
			}
		if(!actions[adversary.actions[i]].nullify.includes(this.actions[i]))
			{
				adversary.hp-=actions[this.actions[i]].damage;console.log("Opponent loses "+actions[this.actions[i]].damage+" HP.");
				$('#'+this.id+i+' path').css('fill','green');
			}
		else
			{
				$('#'+this.id+i+' path').css('fill','red');
			}
	}
	this.updateHP();
	adversary.updateHP();
}

Character.prototype.setAction = function(action,adversary){
	if(this.hp<1 ||adversary.hp<1){return false;}
	console.log(this.clock+'!!!');
	if(this.clock == 0){
		adversary.setRandomActions();
		$('#player_actions_display path').css('fill','black');
	}
	this.actions.push(action);
	$('#'+this.id+this.clock+' path').attr('d',actions[action].path).css('fill','white');
	this.clock++;
	if(this.clock == 3){
		this.actAgainst(adversary);
		this.actions = [];
		this.clock = 0;
	}
	if(this.hp<1){
		$('svg path').attr('d',defeat_path).css('fill','violet');
	}
	else if(adversary.hp<1){
		$('svg path').attr('d',win_path).css('fill','gold');
	}
};

/*
var Duel = function(player,opponent){
	this.possibleActions = ['attack','feint','parry'];
	this.player = player;
	this.opponent = opponent;
	this.setOpponentAction();
	this.updateStatus();
	this.gameover = false;

	return this;
}


Duel.prototype.updateStatus = function(){
	$("#player_HP").text(this.player.hp);
	$("#opponent_HP").text(this.opponent.hp);
};

Duel.prototype.setOpponentAction = function(){
	this.opponent.action = this.possibleActions[Math.floor(Math.random()*this.possibleActions.length)];
};

Duel.prototype.log = function(logtext){
	$('#results').append('<div>'+logtext+'</div>');
};

Duel.prototype.isGameOver = function(){
	if(this.gameover){return true;}
	else{
		if(this.player.hp<1){
			this.gameover = true;
			this.log('<span class="loser">You have been defeated.</span>');
			return true;
		}
		else if(this.opponent.hp < 1){
			this.gameover = true;
			this.log('<span class="winner">You have prevailed!</span>');
			return true;
		}
		else{
			return false;
		}
	}
};

Duel.prototype.attack = function(){
	switch(this.opponent.action){
		case "attack":
			this.player.hp--;
			this.opponent.hp--;
			this.log("You exchange blows with your opponent, and are both injured.");
			break;
		case "feint":
			this.opponent.hp--;
			this.log("You catch your opponent in the middle of a feint and deal a nasty cut.");
			break;
		case "parry":
			this.player.hp--;
			this.log("Your opponent blocks your blade and counter-attacks immediately, leaving you worst for wear.");
			break;
	}
	this.setOpponentAction();
	this.updateStatus();
};

Duel.prototype.feint = function(){
	switch(this.opponent.action){
		case "attack":
			this.player.hp--;
			this.log("Your opponent sees right through the feint and you feel the bite of their steel.");
			break;
		case "feint":
			this.log("You both try to trick each other but only manage to look like clumsy dancers.");
			break;
		case "parry":
			this.opponent.hp--;
			this.log("Your opponent's blade goes high, yours go low, he didn't see that one coming.");
			break;
	}
	this.setOpponentAction();
	this.updateStatus();
};

Duel.prototype.parry = function(){
	switch(this.opponent.action){
		case "attack":
			this.opponent.hp--;
			this.log("You catch your opponent's blade and riposte with ease.");
			break;
		case "feint":
			this.player.hp--;
			this.log("You lose sight of your opponent's weapon as you go for a block, it cuts deep.");
			break;
		case "parry":
			this.log("The crowd boos you both as you circle each other without making a move.");
			break;
	}
	this.setOpponentAction();
	this.updateStatus();
};

*/

$(document).ready(function(){

	playerl = new Character('player');
	oppl = new Character('opponent');
	initiate_actions();

	$('#player_screen .actions svg').on('click',function(){
		playerl.setAction($(this).attr('id'),oppl);
	});

	/*fight = new Duel(player,opponent);

	$('#attack').click(function(){
		if(!fight.isGameOver()){fight.attack();}
	});
	$('#feint').click(function(){
		if(!fight.isGameOver()){fight.feint();}
	});
	$('#parry').click(function(){
		if(!fight.isGameOver()){fight.parry();}
	});*/
});