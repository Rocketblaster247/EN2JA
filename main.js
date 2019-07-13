var dataset = [];
var net = new brain.recurrent.LSTM();

var load = function (d) {
    console.log("Finding sentences...");
    dataset = d.toString().split("\t").join("   ").toString().split("\n");
    console.log("Loaded dataset...");
    console.log(dataset);
    if (!brain) {
        console.log("Missing dependencie 'brain.js'");
        return;
    }
    console.log("Training...");
    net.train(dataset, {
        iterations: 20000,
        errorThresh: 0.005,
        log: true,
        logPeriod: 10,
        learningRate: 0.3,
        momentum: 0.1,
        callback: null,
        callbackPeriod: 10,
        timeout: Infinity,
    });
};
var xhr = new XMLHttpRequest();
xhr.open("GET", "jpn.txt");
xhr.addEventListener("load", function (x) {
    console.log("Loaded file...");
    load(this.responseText);
});
xhr.send();
