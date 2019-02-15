var max_speed = 4;
var bounce = -0.5;
var life_dec = 2.0;
var shrink_rate = 2;
var max_particles = 100;
var all_particles = new particleSystem();
var save_button;

function setup() {
    var canvas = createCanvas(
        window.innerWidth,
        window.innerHeight
      );
    canvas.parent("sketch");
    background(0);

    // save_button = createButton("Save as PNG");
    // // put button in same container as the canvas
    // save_button.parent("sketch");
    // // by default this sets position relative to window...
    // save_button.position(0, 0);
    // save_button.mousePressed(saveCanvas(canvas, "woot", "png"));
}

function draw() {
    all_particles.update();
}

function mouseDragged() {
    if (all_particles.count < max_particles) {
        all_particles.addParticle(createVector(mouseX, mouseY));
    }
}

function particleSystem() {
    this.count = 0;
    this.wanderers = [];

    this.addParticle = function(location) {
        this.count++;
        append(this.wanderers, new Particle(location));
    };

    this.update = function() {
        for(var i=0; i < this.wanderers.length; i++) {
            this.wanderers[i].update();
            if (this.wanderers[i].isDead()) {
                this.wanderers.splice(i, 1);
                this.count--;
            }
            else {
                this.wanderers[i].display();
            }

        }
    };
}

class Particle {
    constructor(location) {
        this.location = createVector(location.x, location.y);
        this.size = 75;
        this.velocity = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.angle = 0.0;

        this.color = new colorGenerator();
    }

    update() {
        this.angle += random(0, TWO_PI);
        var magnitude = random(0, 4);

        this.acc.x += cos(this.angle) * magnitude;
        this.acc.y += sin(this.angle) * magnitude;
        this.acc.limit(3);

        this.velocity.add(this.acc);
        this.velocity.limit(6);

        this.location.add(this.velocity);

        this.size -= shrink_rate;
    }

    display() {
        this.color.update();
        fill(this.color.R, this.color.G, this.color.B);

        ellipse(this.location.x, this.location.y, this.size);
//         this.color.update();
//         fill(this.color.R, this.color.G, this.color.B, 255-this.size*3);
//         this.x1 = this.location.x+Math.cos(this.preangle+(2*Math.PI/3))*this.size/2
//         this.y1 = this.location.y+Math.sin(this.preangle+(2*Math.PI/3))*this.size/2
//         this.x2 = this.location.x+Math.cos(this.preangle+2*(2*Math.PI/3))*this.size/2
//         this.y2 = this.location.y+Math.sin(this.preangle+2*(2*Math.PI/3))*this.size/2
//         this.x3 = this.location.x+Math.cos(this.preangle)*this.size
//         this.y3 = this.location.y+Math.sin(this.preangle)*this.size
        stroke(0, 175);
    }

    isDead() {
        if (this.size < 6) {
            return true;
        }
        else {
            return false;
        }
    }
}

class colorGenerator {
    constructor() {
        this.min_speed = 0.2;
        this.max_speed = 0.7;
        this.R = random(255);
        this.G = random(255);
        this.B = random(255);

        this.Rspeed = (random(1) > 0.5 ? 1 : -1) * random(this.min_speed, this.max_speed);
        this.Gspeed = (random(1) > 0.5 ? 1 : -1) * random(this.min_speed, this.max_speed);
        this.Bspeed = (random(1) > 0.5 ? 1 : -1) * random(this.min_speed, this.max_speed);
    }

    update() {
        this.Rspeed = ((this.R += this.Rspeed) > 255 || (this.R < 0)) ? -this.Rspeed : this.Rspeed;
        this.Gspeed = ((this.G += this.Gspeed) > 255 || (this.G < 0)) ? -this.Gspeed : this.Gspeed;
        this.Bspeed = ((this.B += this.Bspeed) > 255 || (this.B < 0)) ? -this.Bspeed : this.Bspeed;
    }
}