Buffalo.MainMenu = function(game) {};
Buffalo.MainMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'scene');
		this.gameTitle = this.add.sprite(Buffalo._WIDTH*0.5, 40, 'scene');
		this.gameTitle.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;

	},
	startGame: function() {
		this.game.state.start('game');
	}
};