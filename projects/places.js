var num = 100;
var particles = [];
var distance = 0;
var triangles = [];

function setup() {
    var canvas = createCanvas(
        window.innerWidth,
        window.innerHeight
      );
    background(0);
    for (var i = 0; i < num; i++) {
        particles[i] = new Particle();
      }

    distance =  width / 10;
    frameRate(25);


}

function draw() {
    background(255);
    for (var k=0; k < num; k++) {
        particles[k].move();
        particles[k].show();
    }

    triangles = [];
    var particleVec = [];

    for (var i=0; i < num; i++) {
        // this is broken
        particles[i].addP(particles[i]);
        for (var j=i+1; j<num; j++) {
            var d = particles[i].pos.dist(particles[j].pos);
            if (d > 0 && d < distance){
                particles[i].addP(particles[j]);
            }
        }
        if (particles[i].neighbors.length > 2) {
            addTriangles(particles[i].neighbors);
            particles[i].neighbors = [];
        }
    }

    showTriangles();
    distance+=0.02;
}

function addTriangles(points) {
    for (var i=1; i<points.length; ++i) {
        for (var j=i+1; j<points.length; ++j) {
            triangles.push(new Triangle(points[0].pos, points[i].pos, points[j].pos));
        }
    }
}

function showTriangles() {
    // noFill();
    fill(50, 100);

    beginShape(TRIANGLES);
    for (var i=0; i < triangles.length; i++) {
        triangles[i].show();
    }
    endShape();
}

class Particle {
    constructor() {
        this.max = 2;
        this.rad = 3;
        this.pos = createVector(random(width), random(height));
        this.speed = createVector(random(-this.max, this.max), random(-this.max, this.max));
        this.pos = createVector(random(width), random(height));
        this.neighbors = [];
        // this.newForce = createVector(mouseX, mouseY);
    }

    move() {
        if(Math.pow(this.pos.x-mouseX,2) + Math.pow(this.pos.y - mouseY, 2) > Math.pow(30,2)) {
            this.pos.add(this.speed);
            if(this.pos.x < 0 || this.pos.x > width) {
                this.speed.x *= -1.2;
            }
            if(this.pos.y < 0 || this.pos.y > height) {
                this.speed.y *= -1.2;
            }
        }
    }

    show() {
        noStroke();
        fill(50, 100);
        ellipse(this.pos.x, this.pos.y, this.rad);
    }

    addP(newitem) {
        this.neighbors.push(newitem);
    }
}

class Triangle {
    constructor(v1, v2, v3) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }

    show() {
        vertex(this.v1.x, this.v1.y);
        vertex(this.v2.x, this.v2.y);
        vertex(this.v3.x, this.v3.y);
    }
}

class MouseRepel {
    constructor() {
        this.rad = 40;
    }

    capture(p) {
        //this.location = createVector(mouseX, mouseY);
        if(Math.pow(p.x+mouseX,2) + Math.pow(p.y + mouseY, 2) <= Math.pow(this.rad,2)) {
            return true;
        }
        return false;
    }
}