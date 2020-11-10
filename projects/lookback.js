var max_speed = 4;
var bounce = -0.5;
var life_dec = 2.0;
var shrink_rate = 2;
var max_particles = 100;
var all_particles = new particleSystem();
var save_button;
var color_global = 0;

function setup() {
    var canvas = createCanvas(
        window.innerWidth,
        window.innerHeight
      );
    canvas.parent("sketch");
    colorMode(HSB);
    background(0, 0, 0);
}

function draw() {
    all_particles.update();
    if (color_global > 361) color_global =0;
    color_global += 10;
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
        this.wanderers.push(new Particle(location));
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
        this.location = location;
        this.size = 75;
        this.velocity = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.angle = 0.0;
        this.color = color_global;
        this.radius = random(-10,-5)
        this.pivot = this.location.add(createVector(this.radius,0))
    }

    update() { 
        this.location.x = this.pivot.x + this.radius * cos(this.angle);
        this.location.y = this.pivot.y + this.radius * sin(this.angle);
        this.angle += 0.2

        this.size -= shrink_rate;
        this.color += 1
    }

    display() {
        fill(this.color, 50, 100);
        ellipse(this.location.x, this.location.y, this.size);
    }

    isDead() {
        if (this.size < 9) {
            return true;
        }
        else {
            return false;
        }
    }
}