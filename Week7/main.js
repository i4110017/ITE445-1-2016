var mainState = {
	preload: function() {
		game.load.image("player", "assets/player.png");

		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH', 'assets/wallHorizontal.png');

		game.load.image('coin', 'assets/coin.png');
		game.load.image('enemy', 'assets/enemy.png');
	},
	create: function() {
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.ARCARDE);
		game.renderer.renderSession.roundPixels = true; 
		this.player = game.add.sprite(game.width/2, game.height / 2, "player");
		this.player.anchor.setTo(0.5,0.5);

		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 500;

		this.cursor = game.input.keyboard.createCursorKeys();

		// this.player.tint = 0xff00ff;

		this.createWorld();

		// Display the coin
		this.coin = game.add.sprite(60, 140, 'coin'); // Add Arcade physics to the coin
		game.physics.arcade.enable(this.coin);
		// Set the anchor point to its center
		this.coin.anchor.setTo(0.5, 0.5);

		// Display the score
		this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
		// Initialize the score variable
		this.score = 0;

		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.enemies.createMultiple(10, "enemy")
		game.time.events.loop(2200, this.addEnemy, this);

		this.enemiesBottom = game.add.group();
		this.enemiesBottom.enableBody = true;
		this.enemiesBottom.createMultiple(10, "enemy")
		game.time.events.loop(2000, this.addEnemyBottom, this);

	},
	update: function() {
		game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
		game.physics.arcade.collide(this.enemies, this.walls);
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

		game.physics.arcade.collide(this.enemiesBottom, this.walls);
		game.physics.arcade.overlap(this.player, this.enemiesBottom, this.playerDie, null, this);

		this.movePlayer();
		if (!this.player.inWorld) { 
			this.playerDie();
		}
	},
	movePlayer: function() {
		if(this.cursor.left.isDown) {
			this.player.body.velocity.x = -200;
		}else if(this.cursor.right.isDown) {
			this.player.body.velocity.x = 200;
		}else {
			this.player.body.velocity.x = 0;
		}

		if(this.cursor.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -320;
		}
	},

	createWorld: function() {
		// Create our group with Arcade physics 
		this.walls = game.add.group(); 
		this.walls.enableBody = true;
		// Create the 10 walls in the group
		game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left 
		game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right
		game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left 
		game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right 
		game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left 
		game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right
		game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left 
		game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right

		var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls); 
		middleTop.scale.setTo(1.5, 1);
		var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls); 
		middleBottom.scale.setTo(1.5, 1);
    // Set all the walls to be immovable
		this.walls.setAll('body.immovable', true); 


	},
	playerDie: function() { 
		game.state.start('main');
	},

	takeCoin: function(player, coin) {
		// Kill the coin to make it disappear from the game 
		this.coin.kill();
		// Increase the score by 5
		this.score += 5;
		// Update the score label by using its 'text' property
		this.scoreLabel.text = 'score: ' + this.score; 

		this.updateCoinPosition();
	},
	updateCoinPosition: function() {
		// Store all the possible coin positions in an array var coinPosition = [
		var coinPosition = [
		{x: 140, y: 60}, {x: 360, y: 60}, // Top row
		{x: 60, y: 140}, {x: 440, y: 140}, // Middle row 
		{x: 130, y: 300}, {x: 370, y: 300} // Bottom row
		];
		// Remove the current coin position from the array
		// Otherwise the coin could appear at the same spot twice in a row 
		for (var i = 0; i < coinPosition.length; i++) {
			if (coinPosition[i].x == this.coin.x) { 
				coinPosition.splice(i, 1);
			} 
		}
		    // Randomly select a position from the array with 'game.rnd.pick'
		var newPosition = game.rnd.pick(coinPosition);
		    // Set the new position of the coin
		this.coin.reset(newPosition.x, newPosition.y); 
	},

	addEnemy: function() {
		var enemy = this.enemies.getFirstDead();

		if (!enemy) { 
			return;
		}
    enemy.anchor.setTo(0.5, 1);
    enemy.reset(game.width/2, 0);
    enemy.body.gravity.y = 500;
    enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
    enemy.body.bounce.x = 1;
		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
	},
	addEnemyBottom: function() {
		var enemy = this.enemies.getFirstDead();

		if (!enemy) { 
			return;
		}
    enemy.anchor.setTo(0.5, 1);
    enemy.reset(game.width/2, game.height);
    enemy.body.gravity.y = -500;
    enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
    enemy.body.bounce.x = 1;
		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
	}
};
var game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");

game.state.add("main", mainState);
game.state.start("main");













