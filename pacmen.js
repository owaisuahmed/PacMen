let pos = 0;
// This array holds all the paths to the images for PacMan
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
// This variable defines what direction should PacMan go into:
// 0 = left to right
// 1 = right to left (reverse)
let direction = 0;
// This variable helps determine which PacMan image should be displayed. It flips between values 0 (facing right) and 1 (facing left)
let focus = 0;
// This variable keeps track of whether the Start Game button has been clicked once.
let firstClick = false;
// This array holds all the instances of PacMan
const pacMen = []; 


// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[0][0];
  newimg.width = 100;
  
  // TODO: set position here
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  // TODO add new Child image to game
  game.appendChild(newimg);  

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // This function is first called when the Start Game button is clicked
  firstClick = true;
  // Loop over pacMen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    // Change the image
    item.newimg.src = pacArray[direction][focus];

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 70);
}

function checkCollisions(item) {
  //Detect collision with all walls and make pacman bounce
  //For the left and right edges  
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
        
    if (direction === 0 && item.position.x + item.velocity.x + item.newimg.width > window.innerWidth) {
      direction = 1;
    }
    if (direction === 1 && item.position.x + item.velocity.x + item.newimg.width > window.innerWidth) {
      direction = 0;
    }
  }
  
  //For the top and bottom edges
  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
  //Update direction and focus variables.
  focus = (focus + 1) % 2;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
  //Start if one is already there
  if (pacMen.length > 1) {
    update();
  }
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}