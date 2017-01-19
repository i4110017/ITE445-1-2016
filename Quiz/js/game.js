var game = new Phaser.Game(800, 400, Phaser.AUTO, "gameDiv");
game.global = {
	score: 0
};

game.state.add("boot", bootState);
game.state.add("myplay", myPlayState);

game.state.start("boot");