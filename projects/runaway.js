var line_num;
var box_num;
var posx, posy, posz;
var eyesetx;
var eyesety;
var eyesetz;
var camsetx;
var camsety;
var camsetz;
var targetx;
var targety;
var targetz;
var offsetx;
var offsety;
var offsetz;
var stx, sty, stz;
var enx, eny, enz;
var lines = [];
var boxes = [];
var rc = 0;
var gc = 30;
var bc = 60;
function setup () {
	pixelDensity(displayDensity ());
	createCanvas(windowWidth, windowHeight, WEBGL);
	background (0);
	line_num = 500;
    box_num = 500;
    
	eyesetx = width / 2.0;
	eyesety = height / 2.0;
    eyesetz = 0.0;
    
	camsetx = width / 2.0;
	camsety = height / 2.0;
    camsetz = 0.0;
    
	offsetx = width / 2.0;
	offsety = height / 2.0;
    offsetz = 0.0;
    
    // Render all objects in the middle of the screen
    translate(offsetx, offsety, offsetz);
    // Set the viewer in the middle
	posx = 0.0;
	posy = 0.0;
	posz = 0.0;
}
function draw () {
    background (0);
    // ambient gray light
    ambientLight (155, 155, 155);
    // Directional highlighting from the bottom
    directionalLight(100, 100, 100, 0, 0, 100);
    // Move pos forward
	posz -= 120.0;
    lines.push (new LineObject (posx, posy, posz));
    
    // Get rid of oldest lines as we make new ones
	if (lines.length > line_num) {
		lines = subset(lines, lines.length - (line_num - 1), line_num);
    }
    // Once we have enough, start rendering
	if (lines.length > 100){
        // console.log(targetx, camsetx, mouseX, eyesetx);
        // Allows for panning, multiply by 1.5 for wider possible view
		targetx = (mouseX - offsetx) * 1.6;
		targety = (mouseY - offsety) * 1.6;
		eyesetx += (targetx - eyesetx) * 0.07;
		eyesety += (targety - eyesety) * 0.07;
		eyesetz = lines[lines.length - 100].posz;
		camsetx += (targetx - camsetx) * 0.07;
		camsety += (targety - camsety) * 0.07;	
		camsetz = eyesetz - 10.0;
		camera(eyesetx, eyesety, eyesetz,
				camsetx, camsety, camsetz,
				0.0, 1.0, 0.0);
		for (var i = 0; i < lines.length - 1; i++) {
			if (i > 0) {
				stroke (100);
				strokeWeight (1);
				noFill ();
				stx = lines[i].posx;
				sty = lines[i].posy;
				stz = lines[i].posz;
				enx = lines[i - 1].posx;
				eny = lines[i - 1].posy;
				enz = lines[i - 1].posz;
			}
		}
		for (var i = 0; i < 2; i++) {
			var c = color (rc, gc, bc);
			boxes.push (new BoxObject (posx + random (-600, 600), posy + random (-600, 600), posz, 0, random (15, 100), random (50, 100), random (50, 100), c));
		}
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].render ();
		}
		if (boxes.length > box_num) {
			for (var i = 0; i < 3; i++) {
				boxes = subset (boxes, boxes.length - (box_num - 1), box_num);
			}
        }

        // rainbow colors
        rc += 10;
        bc += 5;
        gc += 7;
        if (rc > 255) rc = 0;
        if (bc > 255) bc = 0;
        if (gc > 255) gc = 0;
	}
	
}
function LineObject (posx, posy, posz) {
	this.posx = posx;
	this.posy = posy;
	this.posz = posz;
}
function BoxObject (x, y, z, a, sx, sy, sz, c) {
	var alpha = a;
	var box_sizex = sx;
	var box_sizey = sy;
	var box_sizez = sz;
	var box_locx = x;
	var box_locy = y;
	var box_locz = z;
	var col = c;
	this.render = function () {
		alpha += 2.8;
		fill (col, alpha * 1.75);
		stroke (col, alpha * 1.8);
		strokeWeight (alpha / 240);
		push();
		translate(box_locx, box_locy, box_locz);
		box(sin(box_sizex)*30, cos(box_sizey)*20, tan(box_sizez)*90);
		rotateX(mouseX);
		rotateZ(mouseY);
		pop ();
	}
}