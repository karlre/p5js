var VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
var GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
var AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior;
var VerletParticle2D = toxi.physics2d.VerletParticle2D;
var VerletSpring2D = toxi.physics2d.VerletSpring2D;
var AngularConstraint = toxi.physics2d.constraints.AngularConstraint;
var Vec2D = toxi.geom.Vec2D;
var Rect = toxi.geom.Rect;

var tree;
var physics;
var wind_dir;
var wind_speed = 0;

var weather = {
    "coord": {
        "lon": -74.01,
        "lat": 40.71
    },
    "weather": [{
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03d"
    }],
    "base": "stations",
    "main": {
        "temp": 20.22,
        "pressure": 1021.1,
        "humidity": 50,
        "temp_min": 18.89,
        "temp_max": 21.67
    },
    "wind": {
        "speed": 4.71,
        "deg": 184.502
    },
    "clouds": {
        "all": 32
    },
    "dt": 1474907733,
    "sys": {
        "type": 3,
        "id": 1452377816,
        "message": 0.0043,
        "country": "US",
        "sunrise": 1474886923,
        "sunset": 1474929868
    },
    "id": 5128581,
    "name": "New York",
    "cod": 200
};

var person;
var skin_tones;
var theta1;
var theta2;
var inp;
var button;

function setup() {
    createCanvas(800, 600);
    inp = createInput('Pick a city!');
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
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + inp.value() + "&units=metric&APPID=d31f6c099568450a6038675d7b2bbcb7";
    loadJSON(url, gotWeather);
}

function gotWeather(weather) {
    if (weather.cod == "404") {
        createP("City not found!")
    } else {
        wind_dir = weather.wind.deg;
        wind_speed = weather.wind.speed;
    }
}
