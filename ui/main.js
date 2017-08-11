// Counter code

var button = document.getElementById('counter');

button.onclick = function () {
  
  // Make a request to counrte and endpoint.
  
  // Capture a response in the variable.
  request.onreadystatechange = function(){
    if (request.readystate === XMLHttpRequest.DONE) {
    // Take some action
    if (request.status == 200) {
         var counter = request.responseText;
         var span = document.getElementById('count');
         span.innerHTML = counter.toString();
        } 
    }
    
    // Not done yet
    
  };
  
  
  // Make the request
    request.open('Get', 'http://shuklalokesh94.imad.hasura-app.io/counter', true);
    request.send(null);
};