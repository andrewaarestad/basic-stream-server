
fs = require('fs');


var http = require('http');
var app = http.createServer(function(req,res) {
	fs.readFile(__dirname + '/index.html',
  		function (err, data) {
    		if (err) {
      			res.writeHead(500);
      			return res.end('Error loading index.html');
    		}

    		res.writeHead(200);
    		res.end(data);
  	});
}).listen(3000);

console.log('HTTP server listening on port 3000.');


// Setup websocket
var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
    //our other events...
    console.log('socket.io connected.')
});




// Setup stream receiving socket
require('net').createServer(function (socket) {
    console.log("connected");

    socket.on('data', function (data) {

        var message = "Received " + data.length + " bytes."
        socket.write('ack');

        io.sockets.clients().forEach(function (socket) { socket.send(message); });
        
    });
}).listen(8080);



console.log('Stream listener started on port 8080.');



