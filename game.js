/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

let canvas;
let ctx;
let score = 0;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 469;
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 10;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.png";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/rabbit.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/monster.png";
}

/**
 * Setting up our characters.
 *
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 *
 * The same applies to the monster.
 */

let heroX = canvas.width / 2;
let heroY = canvas.height / 2;

let monsterX = 100;
let monsterY = 100;

/**
 * Keyboard Listeners
 * You can safely ignore this part, for now.
 *
 * This is just to let JavaScript know when the user has pressed a key.
 */
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  addEventListener(
    "keydown",
    function (key) {
      keysDown[key.keyCode] = true;
    },
    false
  );

  addEventListener(
    "keyup",
    function (key) {
      delete keysDown[key.keyCode];
    },
    false
  );
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  

  if (38 in keysDown) {
    // Player is holding up key
    heroY -= 10;
  }
  if (40 in keysDown) {
    // Player is holding down key
    heroY += 10;
  }
  if (37 in keysDown) {
    // Player is holding left key
    heroX -= 10;
  }
  if (39 in keysDown) {
    // Player is holding right key
    heroX += 10;
  }

  if (heroX < 0) {
    heroX = canvas.width;
  }
  if (heroX > canvas.width) {
    heroX = 0;
  }

  if (heroY < 0) {
    heroY = canvas.height;
  }
  if (heroY > canvas.height) {
    heroY = 0;
  }
  // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    heroX <= monsterX + 128 &&
    monsterX <= heroX + 128 &&
    heroY <= monsterY + 128 &&
    monsterY <= heroY + 128
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    monsterX = Math.floor(Math.random() * (canvas.width - 128));
    monsterY = Math.floor(Math.random() * (canvas.height - 128));
    score++;
    console.log("score", score);
  }
  //monter move
  // monsterX += 2;
  // monsterY += 1;
  if (monsterX < 0) {
    monsterX = canvas.width;
  }
  if (monsterX > canvas.width) {
    monsterX = 0;
  }

  if (monsterY < 0) {
    monsterY = canvas.height;
  }
  if (monsterY > canvas.height) {
    monsterY = 0;
  }
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }
  ctx.fillText(
    `Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`,
    20,
    100
  );
  
  
  ctx.fillText(`score: ${score}`, 20, 50);
};


/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  if (SECONDS_PER_ROUND-elapsedTime>0) {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers.
  requestAnimationFrame(main);
  }
  else if (SECONDS_PER_ROUND-elapsedTime==0){
    let status = "Game Over!";
      ctx.textBaseline = "middle"; 
      ctx.font = "30px monospace";
      ctx.fillStyle = "#00FF41";
      ctx.textAlign = "center";
      ctx.fillText(status, 300, 300)  
  }
};
function startGame(){
  loadImages();
  setupKeyboardListeners();
  main();
  
}

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
  requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();
