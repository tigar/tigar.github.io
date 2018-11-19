var inc = 0.05;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;
var rainbowView = true;
var particleView = true;
var particles = [];

var flowfield;

function setup() {
  createCanvas(1000, 700);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  // set white background
  background(20);
  var resetButton = createButton("Clear Screen");
  resetButton.mousePressed(screenClear);
  var bwButton = createButton("Change Color Scheme");
  bwButton.mousePressed(swapColorScheme);

  createP("Vector Change Rate");
  speedSlider = createSlider(1, 10, 4);
  createP("Particle speed (acceleration from the vectors)");
  particleSpeed = createSlider(0, 1000, 100);
  createP("Similarity of vectors");
  fancySlider = createSlider(0, 50, 20);
}

function screenClear() {
  if (rainbowView) {
    background(20);
  }
  else {
    background(255);
  }
}

// Change from BW to rainbow
// swap bg color and particle color?
// change the type of particle? new behavior???
function swapColorScheme() {
  if (rainbowView) {
    background(255);
    rainbowView = false;
    
  }
  else {
    background(20);
    rainbowView = true;
  }
}

function draw() {
  // resets background every loop
  // background(255);
  inc = fancySlider.value()/1000;
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI *4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v.mult(particleSpeed.value());
      xoff += inc;
      // stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += speedSlider.value()/10000;
  }
  if (particleView) {
    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      if (rainbowView) {
        particles[i].showRainbow();
      }
      else {
        particles[i].showBlack();
      }
      // particles[i].showRainbow();
    }
  }


  fr.html(floor(frameRate()));
}