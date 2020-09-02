class Character {
	constructor(){
		this.id;
		this.name;

		this.max_hp;
		this.strength;
		this.speed;
		this.actual_speed;

		this.hp;

		this.inventory;

		this.location;
	}

	setActualSpeed(the_lcm){
		this.actual_speed = the_lcm/this.speed;
	}
}

class Player extends Character{
	constructor(){
		super();
	}
}

class Item {
	constructor(){
		this.id;
		this.name;
	}
}

class Weapon extends Item{
	constructor(){
		super();
		this.damage;
	}
}

class Armor extends Item{
	constructor(){
		super();
		this.defense;
	}
}

class Combat {
	constructor(){
		this.id;

		this.characters;

		this.time;

		this.active = true;
	}

	update_speeds(){
		the_lcm = Array.from(this.characters,x => x.speed).reduce(lcm); // Find lowest common multiple
		for (let i=0; i < this.characters.length; i++){
			this.characters[i].setActualSpeed(the_lcm);
		}
	}

	execute(){
		while(this.active){
			this.time++;
			for (let i=0; i < this.characters.length; i++){
				if(this.time % this.characters[i].actual_speed === 0){

				}
			}
		}
	}
}