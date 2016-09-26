function Particle(pos, parent, trunk_size) {
    VerletParticle2D.call(this, pos);
    physics.addParticle(this);
    this.children = [];
    this.parent = parent;
    this.finished = false;
    this.pos = pos;
    this.trunk_size = trunk_size;
    physics.addBehavior(new AttractionBehavior(this, 50, -0.5));

}

Particle.prototype = Object.create(VerletParticle2D.prototype);
Particle.prototype.constructor = Particle;
