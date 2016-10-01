var VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
var GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
var AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior;
var VerletParticle2D = toxi.physics2d.VerletParticle2D;
var VerletSpring2D = toxi.physics2d.VerletSpring2D;
var VerletConstrainedSpring2D = toxi.physics2d.VerletConstrainedSpring2D;
var AngularConstraint = toxi.physics2d.constraints.AngularConstraint;
var Vec2D = toxi.geom.Vec2D;
var Rect = toxi.geom.Rect;

var physics;
var particles = [];
var springs = [];

var head_img;
var foot_img;

function preload() {
    head_img = loadImage("dan.png");
    foot_img = loadImage("foot.png");
    hand_img = loadImage("hand.png");
    torso_img = loadImage("suit2.png");
    logo_img = loadImage("logo.png");
}

function setup() {
    createCanvas(600, 800);
    physics = new VerletPhysics2D();
    physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));
    physics.setWorldBounds(new Rect(0, 0, width, height));
    imageMode(CENTER);

    buildDan();
}

function buildDan() {
    var start_x = width / 2,
        start_y = height / 2 - 200;
    var head = new Particle(start_x, start_y - 35);
    head.lock();
    particles.push(head);

    // torso
    var torso_head_joint = new Particle(start_x, start_y);
    particles.push(torso_head_joint);
    var torso_left_arm_joint = new Particle(start_x + 30, start_y + 20);
    particles.push(torso_left_arm_joint);
    var torso_right_arm_joint = new Particle(start_x - 30, start_y + 20);
    particles.push(torso_right_arm_joint);
    var torso_left_leg_joint = new Particle(start_x + 30, start_y + 100);
    particles.push(torso_left_leg_joint);
    var torso_right_leg_joint = new Particle(start_x - 30, start_y + 100);
    particles.push(torso_right_leg_joint);

    //legs

    var left_knee_joint = new Particle(start_x + 30, start_y + 170);
    particles.push(left_knee_joint);

    var right_knee_joint = new Particle(start_x - 30, start_y + 170);
    particles.push(right_knee_joint);

    var left_foot_joint = new Particle(start_x + 30, start_y + 240);
    particles.push(left_foot_joint);

    var right_foot_joint = new Particle(start_x - 30, start_y + 240);
    particles.push(right_foot_joint);

    //arms

    var left_elbow_joint = new Particle(start_x + 30, start_y + 100);
    particles.push(left_elbow_joint);

    var right_elbow_joint = new Particle(start_x - 30, start_y + 100);
    particles.push(right_elbow_joint);

    var left_hand_joint = new Particle(start_x + 30, start_y + 150);
    particles.push(left_hand_joint);

    var right_hand_joint = new Particle(start_x - 30, start_y + 150);
    particles.push(right_hand_joint);




    var len = dist(torso_head_joint.x, torso_head_joint.y, torso_left_arm_joint.x, torso_left_arm_joint.y);
    springs.push(new Spring(torso_head_joint, torso_left_arm_joint, len));

    var len = dist(torso_head_joint.x, torso_head_joint.y, torso_right_arm_joint.x, torso_right_arm_joint.y);
    springs.push(new Spring(torso_head_joint, torso_right_arm_joint, len));

    var len = dist(torso_left_arm_joint.x, torso_left_arm_joint.y, torso_left_leg_joint.x, torso_left_leg_joint.y);
    springs.push(new Spring(torso_left_arm_joint, torso_left_leg_joint, len));

    var len = dist(torso_right_arm_joint.x, torso_right_arm_joint.y, torso_right_leg_joint.x, torso_right_leg_joint.y);
    springs.push(new Spring(torso_right_arm_joint, torso_right_leg_joint, len, "torso"));

    var len = dist(head.x, head.y, torso_head_joint.x, torso_head_joint.y);
    springs.push(new Spring(head, torso_head_joint, len, "head"));

    var len = dist(torso_left_arm_joint.x, torso_left_arm_joint.y, torso_right_arm_joint.x, torso_right_arm_joint.y);
    springs.push(new Spring(torso_left_arm_joint, torso_right_arm_joint, len));

    var len = dist(torso_left_arm_joint.x, torso_left_arm_joint.y, torso_right_leg_joint.x, torso_right_leg_joint.y);
    springs.push(new Spring(torso_left_arm_joint, torso_right_leg_joint, len));

    var len = dist(torso_right_arm_joint.x, torso_right_arm_joint.y, torso_left_leg_joint.x, torso_left_leg_joint.y);
    springs.push(new Spring(torso_right_arm_joint, torso_left_leg_joint, len));

    var len = dist(torso_left_leg_joint.x, torso_left_leg_joint.y, torso_right_leg_joint.x, torso_right_leg_joint.y);
    springs.push(new Spring(torso_left_leg_joint, torso_right_leg_joint, len));

    var len = dist(torso_left_leg_joint.x, torso_left_leg_joint.y, left_knee_joint.x, left_knee_joint.y);
    springs.push(new Spring(torso_left_leg_joint, left_knee_joint, len, "right_leg"));
    //legs
    var len = dist(torso_right_leg_joint.x, torso_right_leg_joint.y, right_knee_joint.x, right_knee_joint.y);
    springs.push(new Spring(torso_right_leg_joint, right_knee_joint, len, "left_leg"));

    var len = dist(left_knee_joint.x, left_knee_joint.y, left_foot_joint.x, left_foot_joint.y);
    springs.push(new Spring(left_knee_joint, left_foot_joint, len, "right_foot"));

    var len = dist(right_knee_joint.x, right_knee_joint.y, right_foot_joint.x, right_foot_joint.y);
    springs.push(new Spring(right_knee_joint, right_foot_joint, len, "left_foot"));
    //arms
    var len = dist(torso_left_arm_joint.x, torso_left_arm_joint.y, left_elbow_joint.x, left_elbow_joint.y);
    springs.push(new Spring(torso_left_arm_joint, left_elbow_joint, len, "right_elbow"));

    var len = dist(torso_right_arm_joint.x, torso_right_arm_joint.y, right_elbow_joint.x, right_elbow_joint.y);
    springs.push(new Spring(torso_right_arm_joint, right_elbow_joint, len, "left_elbow"));

    var len = dist(left_elbow_joint.x, left_elbow_joint.y, left_hand_joint.x, left_hand_joint.y);
    springs.push(new Spring(left_elbow_joint, left_hand_joint, len, "right_hand"));

    var len = dist(right_elbow_joint.x, right_elbow_joint.y, right_hand_joint.x, right_hand_joint.y);
    springs.push(new Spring(right_elbow_joint, right_hand_joint, len, "left_hand"));



    for (var i = 0; i < particles.length; i++) {
        physics.addParticle(particles[i]);
    }
    for (var i = 0; i < springs.length; i++) {
        physics.addSpring(springs[i]);
    }

}



function draw() {
    background(255);
    physics.update();
    for (var i = 0; i < springs.length; i++) {
        springs[i].show();
    }
    for (var i = 0; i < particles.length; i++) {
        particles[i].addForce(p5.Vector.random2D().mult(1.5))
            // particles[i].show();
    }


}

function Particle(x, y) {
    VerletParticle2D.call(this, x, y);

    this.show = function() {
        push();
        translate(this.x, this.y);
        rotate(this.heading() * 2);
        rect(0, 0, 10, 20);
        pop();
    }
}

Particle.prototype = Object.create(VerletParticle2D.prototype);
Particle.prototype.constructor = Particle;

function Spring(p1, p2, length, body_part) {
    VerletConstrainedSpring2D.call(this, p1, p2, length, 0.05, length * 1.2);
    this.body_part = body_part;

    this.show = function() {
        if (typeof this.body_part !== "undefined")
            if (this.body_part == "head") {
                push();
                translate(this.a.x, this.a.y);
                rotate(atan2(this.a.y - this.b.y, this.a.x - this.b.x) + HALF_PI);
                imageMode(CENTER);
                image(head_img, 0, 0);

                pop();

            } else if (this.body_part == "torso") {
            push();
            translate(this.a.x, this.a.y);
            rotate(atan2(this.a.y - this.b.y, this.a.x - this.b.x) + HALF_PI);
            rectMode(CORNER);
            stroke(0);
            strokeWeight(2);
            fill(120, 81, 169)
            rect(0, -20, 70, 120, 40);
            imageMode(CENTER);
            image(logo_img, 35, 30);
            pop();
        } else {
            stroke(0);
            strokeWeight(20);
            line(this.a.x + 10, this.a.y, this.b.x + 10, this.b.y);
            stroke(120, 81, 169);
            strokeWeight(17);
            line(this.a.x + 10, this.a.y, this.b.x + 10, this.b.y);
            if (this.body_part == "right_foot") {
                imageMode(CORNER);
                push();
                translate(this.b.x, this.b.y);
                image(foot_img, 0, 0);
                pop();
            } else if (this.body_part == "left_foot") {
                imageMode(CORNER);
                push();
                translate(this.b.x, this.b.y);
                scale(-1, 1);
                image(foot_img, 0, 0);
                pop();
            } else if (this.body_part == "right_hand") {
                imageMode(CENTER);
                push();
                translate(this.b.x, this.b.y);

                rotate(atan2(this.a.y - this.b.y, this.a.x - this.b.x) - HALF_PI);
                scale(-1, 1);
                image(hand_img, 0, -hand_img.height / 2);
                pop();
            } else if (this.body_part == "left_hand") {
                imageMode(CENTER);
                push();
                translate(this.b.x, this.b.y);
                rotate(atan2(this.a.y - this.b.y, this.a.x - this.b.x) - HALF_PI);


                image(hand_img, 0, -hand_img.height / 2);
                pop();
            }
        }

    }

}


Spring.prototype = Object.create(VerletConstrainedSpring2D.prototype);
Spring.prototype.constructor = Spring;
