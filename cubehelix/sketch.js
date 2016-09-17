var rgb;

function mousePressed() {
    loop();
}

function mouseReleased() {
    noLoop();
}

function setup() {
    createCanvas(900, 600);


    start_slider = createSlider(0, 3, 0.5, 0.01);
    start_slider.position(120, 0);

    rot_slider = createSlider(-10, 10, -1.5, 0.001);
    rot_slider.position(120, 30);

    gamma_slider = createSlider(0, 10, 1, 0.01);
    gamma_slider.position(120, 60);

    minSat_slider = createSlider(0, 2, 1.2, 0.01);
    minSat_slider.position(120, 90);

    maxSat_slider = createSlider(0, 2, 1.2, 0.01);
    maxSat_slider.position(120, 120);

    minLight_slider = createSlider(0, 1, 0, 0.01);
    minLight_slider.position(120, 150);

    maxLight_slider = createSlider(0, 1, 1, 0.01);
    maxLight_slider.position(120, 180);


    // startHue_slider = createSlider(-360, 360, 1, 1);
    // startHue_slider.position(120, 210);
    //
    // endHue_slider = createSlider(-360, 360, 1, 1);
    // endHue_slider.position(120, 240);

}

function draw() {

    background(128);
    fill(255);
    noStroke();
    translate(0, 0)
    text("Start (" + start_slider.value() + "): ", 5, 15);
    text("Rotation (" + rot_slider.value() + "): ", 5, 45);
    text("Gamma (" + gamma_slider.value() + "): ", 5, 75);
    text("Min saturation (" + minSat_slider.value() + "): ", 5, 105);
    text("Max saturation (" + maxSat_slider.value() + "): ", 5, 135);
    text("Min lightness (" + minLight_slider.value() + "): ", 5, 165);
    text("Max lightness (" + maxLight_slider.value() + "): ", 5, 195);
    // text("Start hue (" + startHue_slider.value() + "): ", 5, 225);
    // text("End hue (" + endHue_slider.value() + "): ", 5, 255);
    rgb = cubehelix(
        start_slider.value(),
        rot_slider.value(),
        gamma_slider.value(),
        minSat_slider.value(),
        maxSat_slider.value(),
        minLight_slider.value(),
        maxLight_slider.value()
        // startHue_slider.value(),
        // endHue_slider.value()
    );

    //translate(300, 200);
    for (var i = 0; i <= 255; i++) {
        noStroke();
        fill(rgb.r[i], rgb.g[i], rgb.b[i]);
        var sz = map(rgb.b[i], 0, 255, 1, 20);
        ellipse(map(rgb.r[i], 0, 255, 300, width - 50), map(rgb.g[i], 0, 255, 0, height - 50), sz, sz);
        ellipse(map(i, 0, 255, 0, width), height - 20, 40, 40);

        if (i > 0) {
            stroke(rgb.r[i], 0, 0);
            line(map(i - 1, 0, 255, 10, width / 2 - 200), map(rgb.r[i - 1], 0, 255, height - 60, height / 2),
                map(i, 0, 255, 10, width / 2 - 200), map(rgb.r[i], 0, 255, height - 60, height / 2));
            stroke(0, rgb.g[i], 0);
            line(map(i - 1, 0, 255, 10, width / 2 - 200), map(rgb.g[i - 1], 0, 255, height - 60, height / 2),
                map(i, 0, 255, 10, width / 2 - 200), map(rgb.g[i], 0, 255, height - 60, height / 2));
            stroke(0, 0, rgb.b[i]);
            line(map(i - 1, 0, 255, 10, width / 2 - 200), map(rgb.b[i - 1], 0, 255, height - 60, height / 2),
                map(i, 0, 255, 10, width / 2 - 200), map(rgb.b[i], 0, 255, height - 60, height / 2));
        }
    }
}
