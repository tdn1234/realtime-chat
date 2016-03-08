//Lets require/import the HTTP module
var http = require('http');
fs = require('fs');
//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
	fs.readFile("client.html", 'utf-8', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
    
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server211 listening on: http://localhost:%s", PORT);
});
// console.log("Server listening on: http://localhost:%s", PORT);

var io =  require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	socket.on('message_on_server', function(data){
		// console.log(data['message']);
		io.sockets.emit('message_to_client', {message: data['message']});
	});
});

