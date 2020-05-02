actions = {
	attack:{
		nullify:['feint'],
		damage:3,
		path:paths.attack
	},
	feint:{
		nullify:['parry','feint'],
		damage:2,
		path:paths.feint
	},
	parry:{
		nullify:['attack','parry'],
		damage:2,
		path:paths.parry
	},
	dodge:{
		nullify:['attack','parry','feint'],
		damage:0,
		path:paths.dodge
	}
}

action_keys = Object.keys(actions);