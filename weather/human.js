function Human(x, y) {
    this.x = x;
    this.y = y;
    this.torso_color = random(360);
    this.pants_color = random(360);
    this.socks_color = random(360);
    this.hair_color = random(360);
    this.skin_color = skin_tones[Math.floor(Math.random() * skin_tones.length)];

    this.person_width = random(20, 50);
    this.torso_height = random(50, 100);
    this.pants_height = random(50, 100);
    this.socks_height = random(10, 30);
    this.crotch_ratio = random(0.2, 0.4);
    this.arm_length = random(30, this.torso_height);
    this.crotch = this.pants_height * this.crotch_ratio;
    this.legs = this.pants_height * (1 - this.crotch_ratio);



    this.show = function() {
        noStroke();
        colorMode(HSB);
        push();
        translate(this.x, this.y);
        this.drawTorso();
        this.drawArms();
        this.drawPants();
        this.drawHead();
        pop();

    }

    this.drawTorso = function() {
        fill(this.torso_color, 100, 100);
        rect(-this.person_width / 2, 0, this.person_width, this.torso_height);
    }

    this.drawPants = function() {
        fill(this.pants_color, 100, 100);
        //crotch area
        rect(-this.person_width / 2, this.torso_height, this.person_width, this.crotch);
        //legs
        rect(-this.person_width / 2, this.torso_height + this.crotch, 10, this.legs);
        rect(this.person_width / 2 - 10, this.torso_height + this.crotch, 10, this.legs);
        //socks
        fill(this.socks_color, 100, 100);
        rect(-this.person_width / 2, this.torso_height + this.crotch + this.legs, 10, this.socks_height);
        rect(this.person_width / 2 - 10, this.torso_height + this.crotch + this.legs, 10, this.socks_height);
        arc(-this.person_width / 2, this.torso_height + this.crotch + this.legs + this.socks_height, 20, 20, PI, 3 * HALF_PI);
        arc(this.person_width / 2, this.torso_height + this.crotch + this.legs + this.socks_height, 20, 20, 3 * HALF_PI, 0);



    }

    this.drawHead = function() {
        colorMode(RGB);
        fill(this.skin_color, 100, 100);
        colorMode(HSB);
        rectMode(CENTER);
        rect(0, -15, 25, 30, 20, 20, 20, 20);
        rectMode(CORNER);
    }

    this.drawArms = function() {
        //shoulders
        arc(-this.person_width / 2.0, 10, 20, 20, PI, -HALF_PI);
        arc(this.person_width / 2.0, 10, 20, 20, HALF_PI * 3, TWO_PI);
        //arms
        colorMode(RGB);
        fill(this.skin_color, 100, 100);
        rect(-this.person_width / 2 - 10, 10, 10, this.arm_length);
        rect(this.person_width / 2, 10, 10, this.arm_length);
        //hands
        arc(-this.person_width / 2.0, this.arm_length + 10, 20, 20, HALF_PI, PI);
        arc(this.person_width / 2.0, this.arm_length + 10, 20, 20, 0, HALF_PI);
        colorMode(HSB);
    }
}
