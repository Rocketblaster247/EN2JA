//const net = new brain.NeuralNetwork();
//const xor = [
//  { input: [0, 0], output: [0]},
//  { input: [0, 1], output: [1]},
//  { input: [1, 0], output: [1]},
//  { input: [1, 1], output: [0]}
//];

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
    console.log(`trained in ${ obj.iterations } iterations with error: ${ obj.error }`);

    const result01 = net.run([0, 1]);
    const result00 = net.run([0, 0]);
    const result11 = net.run([1, 1]);
    const result10 = net.run([1, 0]);

    assert(result01[0] > 0.9);
    assert(result00[0] < 0.1);
    assert(result11[0] < 0.1);
    assert(result10[0] > 0.9);

    console.log('0 XOR 1: ', result01);  // 0.987
    console.log('0 XOR 0: ', result00);  // 0.058
    console.log('1 XOR 1: ', result11);  // 0.087
    console.log('1 XOR 0: ', result10);  // 0.934
  }
});

// kick it off
//readInputs(trainStream, xor);

var xsy = 0;

function readInputs(stream, data) {
  for (var i = 0; i < 100; i ++) {
    if (xsy + i < data.length) {
      stream.write(data[xsy+i]);
    }
  }
  if (xsy + 100 >= data.length) {
    stream.endInputs();
  }
  xsy += 100;
}

var json;
var dataset = [];
var net = new brain.recurrent.LSTM();
if (json) {
  net.fromJSON(json);
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
        console.log(net.toFunction());
        console.log(net.toJSON());
        document.getElementById("trans").addEventListener("click", function () {
            var input = document.getElementById("tr").value;
            var output = net.run(input);
            document.getElementById("out").innerHTML = input+output;
            console.log(output);
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
