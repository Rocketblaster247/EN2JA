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
    if (!brain) {
        console.log("Missing dependencie 'brain.js'");
        return;
    }
    document.getElementById("train").addEventListener("click", function () {
        console.log("Training...");
        var x = iter;
        var y = iter + parseInt(window.prompt("Training Size:"));
        iter = y;
        net.train(dataset.slice(0,y), {
            iterations: 300,
            errorThresh: 0.02,
            log: true,
            logPeriod: 1,
            learningRate: 0.2,
            momentum: 1,
            callback: null,
            callbackPeriod: 10,
            timeout: 1000*60,
        });
        console.log(net.toFunction());
        console.log(net.toJSON());
        document.getElementById("trans").addEventListener("click", function () {
            var input = document.getElementById("tr").value;
            var output = net.run(input+"   ");
            document.getElementById("out").innerHTML = escape("<span>"+input+"</span> = "+output;
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
