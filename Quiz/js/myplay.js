var myPlayState = {
	create: function() {
		game.add.image(0,0,'background');
		this.player = game.add.sprite(game.width/2, 270, "player");
		this.player.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(this.player);

		this.cursor = game.input.keyboard.createCursorKeys();

		this.coinSound = game.add.audio("coin");
		this.deadSound = game.add.audio("dead");

		this.player.animations.add('normal', [1,2], 8, true);
		this.player.animations.add('right', [3,5], 8, true);
		this.player.animations.add('left', [3,5], 8, true);

		this.player.animations.play('normal');

		var x = 20+ Math.random() * (game.width-40);
		this.fruit = game.add.sprite(x,-20,'fruit');
		this.fruit.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(this.fruit);
		this.fruit.body.gravity.y = 100;

		this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
	},
	update: function() {
		game.physics.arcade.overlap(this.player, this.fruit, this.takeFruit, null, this);
		this.movePlayer();
		
		if (!this.fruit.inWorld) { 
			this.playerDie();
		}
	},
	playerDie: function() {
		this.deadSound.play();
		game.time.events.add(500,this.startMenu,this);
		game.camera.flash(0xffffff, 300);
	},
	startMenu: function() {
		game.state.start('boot');
	},
	movePlayer: function() {
		if(this.cursor.left.isDown) {
			this.player.body.velocity.x = -200;
			this.player.animations.play('left');
		}else if(this.cursor.right.isDown) {
			this.player.body.velocity.x = 200;
			this.player.animations.play('right');

		}else {
			this.player.body.velocity.x = 0;
			this.player.animations.play('normal');
			// this.player.frame = 0;
		}

	},
	takeFruit: function(sprite, sprite1) {
		sprite1.kill();
		game.global.score += 1;
		// Update the score label by using its 'text' property
		this.scoreLabel.text = 'score: ' + game.global.score; 
		this.coinSound.play();
	}
}