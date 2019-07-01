player = {
	name:"Player",
	hp:10,
};

opponent = {
	name:"Opponent",
	hp:10
};

var Duel = function(player,opponent){
	this.actions = ['attack','feint','parry'];
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
	this.opponent.action = this.actions[Math.floor(Math.random()*this.actions.length)];
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

$(document).ready(function(){
	fight = new Duel(player,opponent);

	$('#attack').click(function(){
		if(!fight.isGameOver()){fight.attack();}
	});
	$('#feint').click(function(){
		if(!fight.isGameOver()){fight.feint();}
	});
	$('#parry').click(function(){
		if(!fight.isGameOver()){fight.parry();}
	});
});