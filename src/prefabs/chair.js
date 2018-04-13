import * as Utils from '../utils/util';


class Chair extends Phaser.Group {
	constructor(game, chairName, containerName) {
		super(game);

		this.container = document.getElementById("chair");
		this.chair = this.game.add.sprite(0,0, chairName);
		this.add(this.chair);
		this.chair.alpha = 0;


		Utils.fitInContainer(this.chair, containerName, 0.5, 0.5);

		this.initialScale = this.chair.scale.x;
		this.initialYPos = this.chair.y;

		Utils.display(game, this.chair, 100);

	}

	hide(delay, duration){
		var initScale = this.chair.scale.x;
		var scaleTween = this.game.add.tween(this.chair.scale).to({x: [initScale * 1.2, 0], y: [initScale * 1.2, 0]}, duration, Phaser.Easing.Quadratic.In, true, delay);
	
		scaleTween.onComplete.add(function(){
			this.chair.alpha  = 0;
		},this);
	}
	

	popUp(delay, duration, shaking = false, i = 0){

		// Utils.display(this.game, this.chair, 100);

		// var scaleFinal = this.chair.scale.x;

		this.chair.scale.x = 0;
		this.chair.scale.y = 0;

		var scaleTween = this.game.add.tween(this.chair.scale).to({x: [this.initialScale * 1.2, this.initialScale], y: [this.initialScale * 1.2, this.initialScale]}, duration, Phaser.Easing.Quadratic.In, true, delay);
		
		if(shaking)
		scaleTween.onComplete.add(function(){
			this.shaking(i);
		}, this);
	}

	shaking(i) {
		var initialScale = this.initialScale;
		this.chair.scale.x = initialScale;
		this.chair.scale.y = initialScale;
		this.chair.idleScaleTween = this.game.add.tween(this.chair.scale).to({
			x: [initialScale * 0.95, initialScale * 1.05, initialScale],
			y: [initialScale * 1.05, initialScale * 0.95, initialScale],
		}, 450 + 10*i, Phaser.Easing.Quadratic.InOut, true, 0, -1);

		this.chair.idleScaleTween.repeatDelay(800 + 10 * i);
	}

	getPosition(){
		var location = {};
		location.x = this.chair.x;
		location.y = this.chair.y;
		return location;
	}

	getWidth() {
		return this.chair.width;
	}

	getHeight() {
		return this.chair.height;
	}

	setOption(i){
		this.chair.optionNum = i;

		this.chair.inputEnabled = true;
		this.chair.input.useHandCursor = true;
		this.chair.events.onInputDown.add(function(button) {
			console.log("input" + i);
			this.chair.inputEnabled = false;
			this.game.global.selection = i;
			this.game.onChange.dispatch();
		}, this);
	}

	disableOption() {
		this.chair.inputEnabled = false;
	}

	getOption(){
		return this.chair.optionNum;
	}

}

export default Chair;