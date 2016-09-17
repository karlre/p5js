function cubehelix(start = 0.5, rot = -1.5, gamma = 1.0, minSat = 1.2, maxSat = 1.2, minLight = 0., maxLight = 1.) {
    this.r = [];
    this.g = [];
    this.b = [];
    this.nlev = 256;
    this.start = start;
    this.rot = rot;
    this.gamma = gamma;
    this.minSat = minSat;
    this.maxSat = maxSat;
    this.minLight = minLight;
    this.maxLight = maxLight;
    this.nlev = nlev;
    this.nlo = 0;
    this.nhi = 0;
    // this.startHue = startHue;
    // this.endHue = endHue;
    // this.start = (startHue / 360. - 1.) * 3;
    // this.rot = endHue / 360. - start / 3. - 1;


    for (var i = 0; i < this.nlev; i++) {
        var fract = map(i, 0, this.nlev, this.minLight, this.maxLight);
        var angle = 2 * PI * (this.start / 3.0 + this.rot * fract + 1.0);
        var fract = pow(fract, this.gamma);
        var satar = map(i, 0, 255, this.minSat, this.maxSat);
        var amp = satar * fract * (1 - fract) / 2.0;
        var r1 = fract + amp * (-0.14861 * cos(angle) + 1.78277 * sin(angle));
        var g1 = fract + amp * (-0.29227 * cos(angle) - 0.90649 * sin(angle));
        var b1 = fract + amp * (1.97294 * cos(angle));
        if (r1 > 1) {
            r1 = 1;
            this.nhi++;
        } else if (r1 < 0) {
            r1 = 0;
            this.nlo++;
        }
        if (g1 > 1) {
            g1 = 1;
            this.nhi++;
        } else if (g1 < 0) {
            g1 = 0;
            this.nlo++;
        }
        if (b1 > 1) {
            b1 = 1;
            this.nhi++;
        } else if (b1 < 0) {
            b1 = 0;
            this.nlo++;
        }

        r.push(255 * r1);
        g.push(255 * g1);
        b.push(255 * b1);
    }
    // if (nhi > 0) {
    //     console.log("Warning: color clipping on high-end");
    // }
    // if (nlo > 0) {
    //     console.log("Warning: color clipping on low-end");
    // }
    return {
        'r': r,
        'g': g,
        'b': b
    };
}
