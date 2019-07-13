var dataset = [];
var load = function (d) {
    var sents = d.toString().split("\n");
    for (var i = 0; i < sents.length; i ++) {
        sents[i].toString().split("\t");
        dataset[i] = [sents[i][0], sents[i][1]];
    }
};
var xhr = new XMLHttpRequest();
xhr.open("GET", "jpn.txt");
xhr.addEventListener("load", function (x) {
    console.log("loaded en-ja dataset");
    load(this.responseText);
});
xhr.send();
