document.write("<h2>Test Game</h2><br />");
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 272;
canvas.style.border = "1px solid #9c9898";
document.body.appendChild(canvas);
document.write("<br />");
var log = document.createElement("input");
log.type = "text";
log.readOnly = true;
log.size = 64;
document.body.appendChild(log);



var hero = {
	speed: 256,
	x: 0,
	y: 0,
	hp: 50,
	attack: 1,
	defense: 0,
	gold: 0,
	exp: 0,
	width: 0,
	height: 0
};

var goblin = {
	speed: 128,
	x: 0,
	y: 0,
	hp: 5,
	attack: 1,
	defense: 0,
	width: 0,
	height: 0
};

var treasure = {
	value: 1,
	x: 1000,
	y: 1000,
	width: 0,
	height: 0
};

var hit = {
	x: 0,
	y: 0,
	width: 0,
	height: 0
};

var hitTimer = 0;
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
};
bgImage.src = "images/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
	heroReady = true;
	hero.width = heroImage.width;
	hero.height = heroImage.height;
};
heroImage.src = "images/printHackMainChar.png";

var goblinReady = false;
var goblinImage = new Image();
goblinImage.onload = function() {
	goblinReady = true;
	goblin.width = goblinImage.width;
	goblin.height = goblinImage.height;
};
goblinImage.src = "images/goblin.png";

var treasureReady = false;
var treasureImage = new Image();
treasureImage.onload = function() {
	treasureReady = true;
	treasure.width = treasureImage.width;
	treasure.height = treasureImage.height;
};
treasureImage.src = "images/treasure.png";


var hitReady = false;
var hitImage = new Image();
hitImage.onload = function() {
	hitReady = true;
	hit.width = hitImage.width;
	hit.height = hitImage.height;
};
hitImage.src = "images/hit.png";

//var Inventory = {};
var keysDown = {};

addEventListener("keydown", function(e) {
		keysDown[e.keyCode] = true;
		}, false);
		
addEventListener("keyup", function(e) {
		delete keysDown[e.keyCode];
		}, false);
		
var newGame = function() {
	hero.x = 64;
	hero.y = 64;
	hero.hp = 50;
	hero.gold = 0;
	hero.exp = 0;
	hero.attack = 1;
	hero.defense = 0;
	goblin.x = 300;
	goblin.y = 200;
	treasure.x = Math.random() * (canvas.width - treasure.width);
	treasure.y = Math.random() * (canvas.height - treasure.height);
};

function collision(obj1, obj2) {
	
	if ((obj1.y + obj1.height) < obj2.y) return false;
	if (obj1.y > (obj2.y + obj2.height)) return false;
	if ((obj1.x + obj1.width) < obj2.x) return false;
	if (obj1.x > (obj2.x + obj2.width)) return false;
	
	return true;
}

var update = function(modifier) {

	//update player location based on user input
	if (38 in keysDown && hero.y > 0) {
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown && hero.y + heroImage.height < canvas.height) {
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown && hero.x > 0) {
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x + heroImage.width < canvas.width) {
		hero.x += hero.speed * modifier;
	}

	//make goblin chase player
	if (goblin.x > hero.x) {
		goblin.x -= goblin.speed * modifier;
	}
	if (goblin.x < hero.x) {
		goblin.x += goblin.speed * modifier;
	}
	if (goblin.y > hero.y) {
		goblin.y -= goblin.speed * modifier;
	}
	if (goblin.y < hero.y) {
		goblin.y += goblin.speed * modifier;
	}

	//if player and goblin touch
	if (collision(hero, goblin) && hitTimer == 0) {
		hitTimer = 10;
		hit.x = (hero.x + goblin.x) / 2;
		hit.y = (hero.y + goblin.y) / 2;
		hero.hp -= goblin.attack;
		goblin.hp -= hero.attack;
		log.value = "You got hit!";
	} else if (hitTimer > 0) {
		--hitTimer;
	}
	
	//if hero gets treasure
	if (collision(hero, treasure)) {

		treasure.x = Math.random() * (canvas.width - treasure.width);
		treasure.y = Math.random() * (canvas.height - treasure.height);
		hero.gold += treasure.value;
		log.value = "You got treasure!";
	}
	
	if (hero.hp <= 0) {
		log.value = "You Died! (collected " + hero.gold + " gold)";
		newGame();
	}

};

var render = function() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (treasureReady) {
		ctx.drawImage(treasureImage, treasure.x, treasure.y);
	}
	if (goblinReady) {
		ctx.drawImage(goblinImage, goblin.x, goblin.y);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (hitReady && hitTimer > 0) {
		ctx.drawImage(hitImage, hit.x, hit.y);
	}
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Gold: " + hero.gold, 0, 0);
	
	ctx.beginPath();
	ctx.moveTo(16, 250);
	ctx.lineTo(16 + (hero.hp * 3), 250);
	ctx.lineWidth = 10;
	ctx.strokeStyle = "#ff0000";
	ctx.stroke();
	ctx.moveTo(0,0);
};

var main = function() {
	var now = Date.now();
	var delta = now - then;
	
	update(delta/1000);
	render();
	
	then = now;
};

newGame();
var then = Date.now();
setInterval(main, 1); 