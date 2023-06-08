/*
  Assignment 3
  Selene Chhangur
  Bug Smasher
  #300742304
*/

// Create the canvas
let canvasSelene = document.createElement("canvas");
let gameContainerSelene = canvasSelene.getContext("2d");
canvasSelene.width = 720;
canvasSelene.height = 580;
document.getElementById("myCanvas").appendChild(canvasSelene);

// Background image
let bgStartSelene = false;
let bgImageSelene = new Image();
bgImageSelene.onload = function () {
  bgStartSelene = true;
};
bgImageSelene.src = "images/leaf.jpg";

// Ladybug image
let ladybugStartSelene = false;
let ladybugImageSelene = new Image();
ladybugImageSelene.onload = function () {
  ladybugStartSelene = true;
};
ladybugImageSelene.src = "images/ladybug.png";

let scoreSelene = 0;

// Setting hop timer to 2 seconds
let hoppingTimeSelene = 2000;
let hopSelene = setInterval(function () {
  resetLocation();
}, hoppingTimeSelene);

// The movement in pixels per second
let ladybugSelene = {
  speed: 256,
};

// Mousedown event
canvasSelene.addEventListener("mousedown", clicked, false);

function clicked(event) {
  event.preventDefault();
  // Getting location of the mouse click from player
  let xLocationSelene = event.clientX;
  let yLocationSelene = event.clientY;

  // Checking if the player clicked on the ladybug
  if (
    xLocationSelene > ladybugSelene.x &&
    xLocationSelene < ladybugSelene.x + 95 &&
    yLocationSelene > ladybugSelene.y &&
    yLocationSelene < ladybugSelene.y + 185
  ) {
    // Increasing score by 10 for each click
    scoreSelene += 10;
    resetLocation();
    // Hopping is shorter
    hoppingTimeSelene = hoppingTimeSelene - 100;
    clearInterval(hopSelene);
    hopSelene = setInterval(function () {
      resetLocation();
    }, hoppingTimeSelene);
  }
}

// Resetting the ladybug location when the player smashes a bug
let resetLocation = function () {
  ladybugSelene.x = Math.floor(Math.random() * 720 - 95) + 60;
  ladybugSelene.y = Math.floor(Math.random() * 580 - 97) + 60;
};

// Resetting the hop timer back to 2 seconds
let resetSpeed = function () {
  clearInterval(hopSelene);
  hoppingTimeSelene = 2000;
  hopSelene = setInterval(function () {
    resetLocation();
  }, hoppingTimeSelene);
};
// Resetting score to 0 but maintaining speed
let resetScore = function () {
  scoreSelene = 0;
};

// Draw everything
let render = function () {
  if (bgStartSelene) {
    gameContainerSelene.drawImage(bgImageSelene, 0, 0);
  }

  if (ladybugStartSelene) {
    gameContainerSelene.drawImage(
      ladybugImageSelene,
      ladybugSelene.x,
      ladybugSelene.y
    );
  }

  // Show Score
  document.getElementById("score").innerHTML = "Score: " + scoreSelene;
};

// The main game loop
let mainSelene = function () {
  render();
  // Request to do this again ASAP
  requestAnimationFrame(mainSelene);
};

// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!
mainSelene();
