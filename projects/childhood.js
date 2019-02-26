var x = 0;
var y = 0;
var boxsize;
var diagView = false;
function setup() {
    // var canvas = createCanvas(500,500);
    createCanvas(
    window.innerWidth,
    window.innerHeight
    );
    boxsize = max(width/20, height/20);
    y += boxsize;
    background(0);
    frameRate(20);
    colorMode(HSB, 100);
}

function draw() {
    if (x >= width){
        x = 0;
        y = y+boxsize;
    }
    else{
        x = x + boxsize;
    }
    y = (y >= height) ? 0 : y;
    if (x === 0 && y === 0) {
        diagView = !diagView;
        background(0);
    }
    strokeWeight(3);
    stroke(random(30, 70), 75, 100);
    if (diagView) {
        diagonals();
    } 
    else {
        squares();
    }
}

function mouseClicked() {
    diagView = !diagView;
}

function diagonals() {
    if (random(1) > 0.5) {
        line(x, y, x + boxsize, y+boxsize);
    }
    else {
        line(x, y+boxsize, x + boxsize, y);
    }
}

function squares() {
    switch(round(random(0.51, 4.5))) {
        case 1:
            line(x, y, x + boxsize, y);
            break;
        case 2:
            line(x, y, x, y + boxsize);
            break;
        case 3:
            line(x, y, x - boxsize, y);
            break;
        case 4:
            line(x, y, x, y - boxsize);
            break;
    }
}