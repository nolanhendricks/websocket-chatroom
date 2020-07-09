//retrieve express 
var express = require('express');

//retrieve socket
var socket = require('socket.io');

// App setup (invoke retrieved 'express' function)
var app = express();

// listen on port 
var server = app.listen(4000, function() {
    console.log('listening on port 4000')
});

// static files to share with browser
app.use(express.static('public'));

// socket setup
var io = socket(server);

// get client socket
io.on('connection', function(socket) {
    console.log('User connected socket id:', socket.id);

    // 'chat' = type of message, 'data' = object containing 'handle' who sent it and 'message' (text value)
    // listen for 'chat' event on server socket
    socket.on('chat', function(data) {
        // pass data(message) from client to all clients as a 'chat' event
        io.sockets.emit('chat', data);
    });

    // listen for typing event on server socket
    socket.on('typing', function(data) {
        // pass data(handle name) of client to all clients, except the sender as a 'typing' event
        socket.broadcast.emit('typing', data);
    })
});

io.on('disconnect', function(socket) {
    console.log('User disconnected socket id:', socket.id)
});