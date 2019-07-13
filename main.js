var json;
var dataset = [];
var net = new brain.recurrent.LSTM();
net.maxPredictionLength = 200;
if (json) {
  net.fromJSON(json);
}
var iter = 0;
var trainStream = new brain.TrainStream({
  neuralNetwork: net,
  floodCallback: function() {
    flood(trainStream, data);
  },
  doneTrainingCallback: function(stats) {
    // network is done training!  What next?
  }
});
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
        var x = iter;
        var y = iter + parseInt(window.prompt("Training Size:"));
        iter = y;
        net.train(dataset.slice(x, y), {
            iterations: 20000,
            errorThresh: 0.014,
            log: true,
            logPeriod: 1,
            learningRate: 0.3,
            momentum: 0.1,
            callback: null,
            callbackPeriod: 10,
            timeout: Infinity,
        });
        console.log(net.toFunction());
        console.log(net.toJSON());
    });
};
var xhr = new XMLHttpRequest();
xhr.open("GET", "jpn.txt");
xhr.addEventListener("load", function (x) {
    console.log("Loaded file...");
    load(this.responseText);
});
xhr.send();
