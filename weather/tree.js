function Tree() {
    this.particles = []
    this.growBranches = function() {
        this.particles[0] = new Particle(createVector(width / 3, height - 50), undefined, 0);
        this.particles[0].finished = true;

        this.particles[0].lock();
        this.particles[1] = new Particle(createVector(width / 3, height - 250), this.particles[0], 0);
        // var secret_trunk_particle = new VerletParticle2D(this.particles[1].pos);
        // var secret_trunk_spring = new VerletSpring2D(this.particles[1], secret_trunk_particle, 1, 3.2);
        // secret_trunk_spring.lockB();
        // physics.addSpring(secret_trunk_spring);
        // console.log(secret_trunk_spring);

        var spring = new VerletSpring2D(this.particles[0], this.particles[1], 200, 1);
        physics.addSpring(spring);


        this.particles[0].children.push(this.particles[1]);
        for (var i = 0; i < 7; i++) {
            for (var j = this.particles.length - 1; j >= 0; j--) {
                if (!this.particles[j].finished) {
                    this.branch(j, PI / 4, i);
                    this.branch(j, -PI / 4, i);
                }
                this.particles[j].finished = true;
            }
        }
    }

    this.branch = function(j, r, i) {
        var dir = p5.Vector.sub(this.particles[j].pos, this.particles[j].parent.pos);

        dir.rotate(r);
        dir.mult(0.67);
        var child_pos = p5.Vector.add(this.particles[j].pos, dir);
        var child = new Particle(child_pos, this.particles[j], i);
        this.particles.push(child);
        this.particles[j].children.push(child);
        var spring = new VerletSpring2D(this.particles[j], child, dir.mag(), 1);
        physics.addSpring(spring);
        var secret = new VerletParticle2D(child.pos);
        var spring = new VerletSpring2D(child, secret, 0, 1);
        spring.lockB();
        physics.addSpring(spring);

    }



    this.show = function() {
        for (var i = 0; i < this.particles.length; i++) {
            for (var j = 0; j < this.particles[i].children.length; j++) {
                //console.log(this.particles[i].pos.x, this.particles[i].pos.y, this.particles[i].children[j].pos.x, this.particles[i].children[j].pos.y);
                stroke(159, 129, 112);
                strokeWeight(1 / (this.particles[i].trunk_size + 1) * 20);
                line(this.particles[i].x, this.particles[i].y, this.particles[i].children[j].x, this.particles[i].children[j].y);

            }
            if (!this.particles[i].finished) {
                noStroke();
                fill(140, 240, 100, 100);
                ellipse(this.particles[i].x, this.particles[i].y, 100, 100);
            }
        }
    }

    this.update = function() {
        for (var i = 0; i < this.particles.length; i++) {
            var wind = map(wind_speed, 0, 40, 0, 5);
            this.particles[i].addForce(createVector(random(wind), 0));
        }
    }
}
