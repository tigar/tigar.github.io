
var x1, x2, y1, y2;
var t = 0;
var r = 400;

function setup() {
	var canvas = createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	angleMode(DEGREES);
	stroke(255, 22);
	noFill();
	background(10, 24, 70);
}

function draw() {
    translate(width/2, height/2);
    strokeWeight(noise(t) + 1);
	
    x1 = cos(noise(t) * 360) * noise(202) * r;
    y1 = sin(noise(t) * 360) * noise(202) * r;

    x2 = cos(noise(t + 100) * 360) * noise(t) * r;
    y2 = sin(noise(t + 100) * 360) * noise(t) * r;

    line(x1, y1, x2, y2);

    t += 3;
    console.log(t);
}