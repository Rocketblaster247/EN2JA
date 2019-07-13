var dataset = [];
var load = function () {
  
};
var xhr = new XMLHttpRequest();
xhr.open("GET", "jpn.txt");
xhr.addEventListener("load", function (x) {
  console.log("loaded en-ja dataset");
  console.log(this.responseText);
  load(x);
});
xhr.send();
