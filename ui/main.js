// Counter code

var button = document.getElementById('counter');
var counter = 0;
button.onclick = function () {
  
  // Make a request to counrte and endpoint.
  
  // Capture a response in the variable.
  
  // Render the variable in correct span.
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};