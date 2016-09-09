var corpus;
var current;
var output = "";

function preload() {
    loadJSON("cap.json", process);
}

function setup() {

}

function draw() {

}

function process() {
    current = corpus["I"];
    output = current;
    for (var i = 0; i < 100; i++) {
        var idx = floor(random(corpus[current].length));
        next = corpus[current][idx];
        output += " " + next;
        current = next;
    }
    createP(output);
    noLoop();

}
