var bootState = {
	preload: function() {
		game.load.image("background", "assets/scene.png");
		game.load.image("fruit", "assets/strawbe.png");
		game.load.audio("coin", ['assets/coin.ogg', 'assets/coin.mp3']);
		game.load.audio("dead", ['assets/dead.ogg', 'assets/dead.mp3']);
		game.load.spritesheet('player', 'assets/buffalo.png', 56, 80);
	},
	create: function() {
		game.add.image(0,0,'background');
		var nameLabel = game.add.text(game.width/2, 100, "Little Buffalo", { font: "50px Arial", fill: "#000000"});
		nameLabel.anchor.setTo(0.5,0.5);

		var startLabel = game.add.text(game.width/2, game.height - 150, "press the up arrow key to start", { font: "25px Arial", fill: "#ffffff"});
		startLabel.anchor.setTo(0.5,0.5);

		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.add(this.start, this);
	},
	start: function() {
		game.state.start("myplay");
	}
}