let img, img2, intro, finalImage, hand;
let figs = [];
let activeImage = null;
let showButtons = false;
let showFinal = false;
let startTime = null; // Timer starts on first click
let darknessLevel = 0; // Controls fig darkening over time

let angle = 0;
let angleSpeed = 2;
let maxAngle = 5;

function preload() {
  img = loadImage('figtreewofig.png');
  img2 = loadImage('movefig.jpg');
  intro = loadImage('intro.png');
  finalImage = loadImage('end.png');
  hand = loadImage('hand.png');

  // Assign images to figs
  figs = [
    { x: 490, y: 454, r: 25, img: loadImage('designer.jpg') }, 
    { x: 518, y: 380, r: 25, img: loadImage('math.jpg') }, 
    { x: 616, y: 410, r: 25, img: loadImage('librarian.jpg') }, 
    { x: 546, y: 564, r: 25, img: loadImage('cult.jpg') }, 
    { x: 392, y: 581, r: 25, img: loadImage('huh.jpg') }, 
    { x: 316, y: 507, r: 25, img: loadImage('huh.jpg') },  
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
}

function draw() {
  background('white');

  // Resize images
  img.resize(700, 0);
  img2.resize(500, 0);
  intro.resize(500, 0);
  hand.resize(200, 0);
  finalImage.resize(1080, 0);

  // If final image is active, display it fullscreen
  if (showFinal) {
    fill('black');
    rect(0, 0, width, height);
    image(finalImage, width / 2, height / 2);
    return;
  }

  // Draw main fig tree image
  image(img, 500, height / 2);
  image(intro, width / 2 + 400, height / 2);

  // Calculate oscillating rotation angle
  angle = sin(frameCount * angleSpeed) * maxAngle;

  push();
  translate(450, height / 2 + 35);
  rotate(angle);
  blendMode(DARKEST);
  image(img2, 0, 0);
  pop();


  // **Darkening effect applied to figs only**
  if (startTime) {
    let elapsedTime = millis() - startTime;
    darknessLevel = constrain(map(elapsedTime, 0, 15000, 0, 150), 0, 150); // Darkens over 30s

    push();
    noStroke();
    fill(0, darknessLevel); // Black circles with increasing opacity
    for (let fig of figs) {
      ellipse(fig.x, fig.y, fig.r * 2); // Darkens fig area only
    }
    pop();
  }

  // Display active image on the right
  if (activeImage) {
    activeImage.resize(700, 0);
    image(activeImage, width / 2 + 400, height / 2);
  }

  // Show buttons if needed
  if (showButtons) {
    drawButtons();
  }
  
  push();
  stroke('black');
  noFill();
  image(hand, mouseX + 70, mouseY + 20);
  pop();
}

function mousePressed() {
  // Start timer on first click
  if (startTime === null) {
    startTime = millis();
  }

  // Check if a fig was clicked
  for (let fig of figs) {
    let d = dist(mouseX, mouseY, fig.x, fig.y);
    if (d < fig.r) {
      activeImage = fig.img;
      showButtons = true;
      showFinal = false;
      return;
    }
  }

  // "Pick Again" Button
  if (showButtons && mouseX > width / 2 - 100 && mouseX < width / 2 - 10 &&
      mouseY > 50 && mouseY < 90) {
    activeImage = null;
    showButtons = false;
    showFinal = false;
  }

  // "I Am Content" Button
  if (showButtons && mouseX > width / 2 + 20 && mouseX < width / 2 + 100 &&
      mouseY > 50 && mouseY < 90) {
    showFinal = true;
    showButtons = false;
  }
}

function drawButtons() {
  fill('white');
  rect(width / 2 - 100, 50, 100, 40, 10);
  rect(width / 2 + 20, 50, 100, 40, 10);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("Pick again", width / 2 - 50, 70);
  text("I am content", width / 2 + 70, 70);
}
