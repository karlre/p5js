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

function process(corpus) {
    current = randomStart(corpus);
    output = current;
    for (var i = 0; i < 100; i++) {
        var idx = floor(random(corpus[current].length));
        next = corpus[current][idx];
        output += " " + next;
        current = current.split(" ")[1] + " " + next;
    }
    output += "!";
    var span = createDiv(output);
    span.style("border: 1px solid black; border-radius: 5px; margin-top: 100px; float: left; width: 400px")
    noLoop();

}

function randomStart(corpus) {
    var keys = Object.keys(corpus);
    keys = keys.filter(function(el) {
        return el[0] === el[0].toUpperCase();
    })
    return keys[floor(keys.length * random())];
}
