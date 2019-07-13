var dataset = [];
var load = function (d) {
    console.log("Finding sentences...");
    dataset = d.toString().split("! ").join(" !-n-");
    dataset = dataset.toString().split(". ").join(" .-n-");
    dataset = dataset.toString().split("? ").join(" ?-n-");
    dataset = dataset.toString().split("-n-");
    console.log("Loaded dataset...");
    console.log(dataset);
    if (!brain) {
        console.log("Missing dependencie 'brain.js'");
        return;
    }
    console.log("Preparing to train...");
};
var xhr = new XMLHttpRequest();
xhr.open("GET", "jpn.txt");
xhr.addEventListener("load", function (x) {
    console.log("Loaded file...");
});
xhr.send();
