var drops = [];
var count = 600;

function setup() {
    var canvas = createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    for (var i=0; i < count; i++) {
        drops[i] = new drop();
    }
}

function draw() {
    background(250);
    for (var i=0; i < drops.length-1; i++) {
        drops[i].show();
        drops[i].fall();
    }
    console.log(random(-width, width));
}

class drop {
    constructor() {
        this.pos = createVector(random(width), random(-width, width));
        this.z = random(0, 20);
        this.len = map(this.z, 0, 20, 5, 10);
        this.y_speed = createVector(0, random(5, 22));
        this.thickness = map(this.z, 0, 20, 1, 3);
        
    }
    fall() {
        this.pos = this.pos.add(this.y_speed);
        // this.y_speed = this.y_speed.add(createVector(0, 0.1));
  
        if (this.pos.y > height) {
            this.pos.y = random(-200, -100);
            // this.y_speed = map(this.z, 0, 20, 5, 16);
      }
    }
    
    show() {
        strokeWeight(this.thickness);
        stroke(0, 0, 128);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.len);
    }
  }