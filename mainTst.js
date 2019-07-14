var json;
var dataset = [];
var net = new brain.recurrent.LSTM();
if (json) {
  net.fromJSON(json);
}

const trainStream = new brain.TrainStream({
  neuralNetwork: net,
  /**
   * Write training data to the stream. Called on each training iteration.
   */
  floodCallback: function() {
    readInputs(trainStream, dataset);
  },

  /**
   * Called when the network is done training.
   */
  doneTrainingCallback: function(obj) {
    document.getElementById("trans").addEventListener("click", function () {
        console.log(net.toFunction());
        console.log(net.toJSON());
        var input = document.getElementById("tr").value;
        var output = net.run(input);
        document.getElementById("out").innerHTML = input+output;
        console.log(output);
    });
  }
});

// kick it off
//readInputs(trainStream, xor);

var xsy = 0;

function readInputs(stream, data) {
  var x = function () {
    stream.write(data[xsy].toString());
    xsy++;
    if (xsy == data.length) {
      stream.endInputs();
    }
    console.log(Math.floor((xsy/data.length)*100)+"% Done");
    window.requestAnimationFrame();
  };
  x();
}


var iter = 0;
var load = function (d) {
    d = d.toString().toLowerCase();
    console.log("Finding sentences...");
    dataset = d.toString().split("\t").join("   ").toString().split("\n");
    console.log("Loaded dataset...");
    console.log(dataset);
    dataset.sort();
    if (!brain) {
        console.log("Missing dependencie 'brain.js'");
        return;
    }
    document.getElementById("train").addEventListener("click", function () {
        console.log("Training...");
        /*var x = iter;
        var y = iter + parseInt(window.prompt("Training Size:"));
        iter = y;
        net.train(dataset.slice(x, y), {
            iterations: 300,
            errorThresh: 0.02,
            log: true,
            logPeriod: 1,
            learningRate: 0.2,
            momentum: 0.7,
            callback: null,
            callbackPeriod: 10,
            timeout: 1000*60,
        });*/
        readInputs(trainStream, dataset);
        
    });
};
var xhr = new XMLHttpRequest();
xhr.open("GET", "jpn.txt");
xhr.addEventListener("load", function (x) {
    console.log("Loaded file...");
    load(this.responseText);
});
xhr.send();
