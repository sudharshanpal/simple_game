// Create our only scene called mainScene, in the game.js file
class mainScene {
  // The three methods currently empty

  preload() {
  this.load.image('player', 'assets/player.png');
 
  this.load.image('coin', 'assets/coin.png');

  }
  create() {
  this.player = this.physics.add.sprite(100, 100, 'player'); // Create the player sprite
  this.player.setScale(0.10); // Scale the player sprite to 50% of its original size
  // Store the score in a variable, initialized at 0
  this.coin = this.physics.add.sprite(600, 300, 'coin');
  this.coin.setScale(0.10); // Scale the coin sprite to 50% of its original size
  this.score = -1;
  // The style of the text 
  // A lot of options are available, these are the most important ones
  let style = { font: '20px Arial', fill: 'black' };

// Display the score in the top left corner
// Parameters: x position, y position, text, style
  this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
  this.arrow = this.input.keyboard.createCursorKeys();
  this.wasd = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
  }
  hit() {
  if (this.score > 0) {
    this.player.setScale(0.10 + this.score * 0.01); // Scale the player sprite based on the score
  }
  // Change the position x and y of the coin randomly
  this.coin.x = Phaser.Math.Between(100, 600);
  this.coin.y = Phaser.Math.Between(100, 400);
  // this.player.setScale(0.10*this.score);
  // Increment the score by 10
  this.score += 1;

  // Display the updated score on the screen
  this.scoreText.setText('score: ' + this.score);
}
  update() {
    if (this.player.x < 50 || this.player.x > 13900 || this.player.y < 50 || this.player.y > 450) {
        // If the player goes out of bounds, call the gameOver() method
        this.gameOver();
      }
    // This method is called 60 times per second after create() 
    // It will handle all the game's logic, like movements
    // Handle horizontal movements
    // Move right

      if (this.arrow.right.isDown || this.wasd.right.isDown) {
        this.player.x += 3;
      } else if (this.arrow.left.isDown || this.wasd.left.isDown) {
        this.player.x -= 3;
      }

      // Move down
      if (this.arrow.down.isDown || this.wasd.down.isDown) {
        this.player.y += 3;
      } else if (this.arrow.up.isDown || this.wasd.up.isDown) {
        this.player.y -= 3;
      }

      if (this.physics.overlap(this.player, this.coin)) {
      // Call the new hit() method
      this.hit();
      }

  }

  gameOver() {
    // This method is called when the game is over
    // Display a message on the screen
    this.add.text(300, 200, 'Game Over Press any arrow to Restart', {font: '50px Arial', fill: 'red' , textAlign: 'center'});

    this.arrow = this.input.keyboard.createCursorKeys();

    if (this.arrow.left.isDown || this.arrow.right.isDown || this.arrow.up.isDown || this.arrow.down.isDown) {
      // If the player presses any arrow key, restart the game
      this.scene.restart();
    }
  }
}

new Phaser.Game({
  width: 14000, // Width of the game in pixels
  height: 500, // Height of the game in pixels
  backgroundColor: '#F7F7F7', // The background color (blue)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});




