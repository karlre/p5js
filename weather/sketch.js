var VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
var GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
var AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior;
var VerletParticle2D = toxi.physics2d.VerletParticle2D;
var VerletConstrainedSpring2D = toxi.physics2d.VerletConstrainedSpring2D;
var VerletSpring2D = toxi.physics2d.VerletSpring2D;
var AngularConstraint = toxi.physics2d.constraints.AngularConstraint;
var Vec2D = toxi.geom.Vec2D;
var Rect = toxi.geom.Rect;

var tree;
var physics;
var wind_dir;
var wind_speed = 0;

var person;
var skin_tones;
var theta1;
var theta2;
var inp;
var button;

function setup() {
    createCanvas(800, 600);
    inp = createInput('Pick a city, for example "New York, NY", "Dallas, TX", "Wellington, New Zealand"!');
    inp.size(500);
    button = createButton('click me');
    button.mousePressed(getWeather);
    fill(0);
    skin_tones = [color(255, 223, 196),
        color(198, 120, 86),
        color(240, 200, 201),
        color(92, 56, 54),
        color(135, 4, 0),
        color(91, 0, 1),
    ]
    person = new Human(random(width / 4, width), height - 200);
    physics = new VerletPhysics2D();
    physics.addBehavior(new GravityBehavior(new Vec2D(0, -0.5)));
    physics.setWorldBounds(new Rect(0, 0, width, height));
    tree = new Tree();
    tree.growBranches();
}

function draw() {
    colorMode(RGB);
    background(137, 207, 240);
    fill(135, 169, 107);
    ellipse(width / 2, height * 3.5, width * 4, width * 4);
    tree.update();
    physics.update();
    tree.show();
    person.show();
    fill(0);
    text("Wind speed:", 10, 20);
    text(wind_speed + " m/s", 100, 20);

}

function getWeather() {
<<<<<<< HEAD
    var url = "https://api.wunderground.com/api/0f3813655fbd4a81/conditions/q/" + inp.value().replace(" ", "+") + ".json";
=======
    var url = "https://api.wunderground.com/api/0f3813655fbd4a81/conditions/q/" + inp.value().replace(" ", "_") + ".json";
>>>>>>> 5fdba86a22cda05cd0a54c82172b88dc8a7be3d7
    loadJSON(url, gotWeather);
}

function gotWeather(weather) {
    if (weather.response.error) {
        createP("City not found!")
    } else {
        wind_dir = weather.current_observation.wind_degrees;
        wind_speed = weather.current_observation.wind_kph;
    }
}
