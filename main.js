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
    document.getElementById("train").addEventListener("click", function () {
        console.log("Training...");
        net.train(dataset.slice(0,parseInt(window.prompt("Training Size:"))), {
            iterations: 20000,
            errorThresh: 0.013,
            log: true,
            logPeriod: 1,
            learningRate: 0.3,
            momentum: 0.1,
            callback: null,
            callbackPeriod: 10,
            timeout: Infinity,
        });
    });
};
var xhr = new XMLHttpRequest();
xhr.open("GET", "jpn.txt");
xhr.addEventListener("load", function (x) {
    console.log("Loaded file...");
    load(this.responseText);
});
xhr.send();
