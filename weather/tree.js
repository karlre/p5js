function Tree() {
    this.particles = []
    this.leaves = [];
    this.growBranches = function() {
        this.particles[0] = new Particle(createVector(width / 3, height - 50), undefined, 0);
        this.particles[0].finished = true;

        this.particles[0].lock();
        this.particles[1] = new Particle(createVector(width / 3, height - 250), this.particles[0], 0);
        var secret_trunk_particle = new VerletParticle2D(this.particles[1].pos);
        secret_trunk_particle.lock();
        var secret_trunk_spring = new VerletConstrainedSpring2D(this.particles[1], secret_trunk_particle, 10, 1, 200);
        // secret_trunk_spring.lockB();
        physics.addSpring(secret_trunk_spring);
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
        child.addBehavior(new AttractionBehavior(child, 50, -0.5));
        child.addBehavior(new GravityBehavior(new Vec2D(0, -0.5)));

        this.particles[j].children.push(child);
        var spring = new VerletSpring2D(this.particles[j], child, dir.mag(), 1);
        physics.addSpring(spring);
        var secret = new VerletParticle2D(child.pos);
        secret.lock();
        var spring = new VerletSpring2D(child, secret, dir.mag(), 0.005);

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
                colorMode(HSB);
                var c = noise(i + j);
                fill(map(c, 0, 1, 0, 60), 100, 100, .5);
                ellipse(this.particles[i].x, this.particles[i].y, 100, 100);
                if (random() < 0.0001 * (1 + wind_speed)) {
                    var leaf = new VerletParticle2D(this.particles[i].x, this.particles[i].y);
                    physics.addParticle(leaf);
                    leaf = leaf.removeAllBehaviors();
                    leaf.addBehavior(new GravityBehavior(new Vec2D(0, 0.05)))

                    this.leaves.push(leaf);
                }
            }
        }
    }

    this.update = function() {
        for (var i = 0; i < this.particles.length; i++) {
            var wind = map(wind_speed, 0, 40, 0, 100);
            this.particles[i].addForce(createVector(random(wind), 0));
        }
    }

    this.updateLeaves = function() {
        for (var i = 0; i < this.leaves.length; i++) {
            if (this.checkEdges(i)) {
                physics.removeParticle(this.leaves[i]);
                this.leaves.splice(i, 1);
            } else {
                var c = noise(i);
                colorMode(HSB);
                fill(map(c, 0, 1, 0, 60), 100, 100, 0.9);
                ellipse(this.leaves[i].x, this.leaves[i].y, 10, 6);
                colorMode(RGB);

                var wind = map(wind_speed, 0, 40, 0, 10);
                this.leaves[i].addForce(createVector(random(wind), 0));
            }
        }
    }

    this.checkEdges = function(i) {
        if (this.leaves[i].x >= width || this.leaves[i].x <= 0 || this.leaves[i].y >= height || this.leaves[i].y <= 0) {
            return true;
        }
        return false;
    }
}
