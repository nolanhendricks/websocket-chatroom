// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var handle = document.getElementById('handle'),
    message = document.getElementById('message'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit Events
// when send is clicked, pass data(object) as 'chat' event to server
btn.addEventListener('click', function() {
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    })
});

// Keypress brodacast
message.addEventListener('keypress', function() {
    socket.emit('typing', {
        handle: handle.value
    });
});

// Listen for events
// 'chat' event
socket.on('chat', function(data) {
    // on 'chat' event, take received data and append to output div
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    // clear 'typing' string
    feedback.innerHTML = "";
    // clear message typing box 
    message.value = '';
});

// 'typing' event
socket.on('typing', function(data) {
    feedback.innerHTML = ' <p><em>' + data.handle + ': is typing a message...</em></p > ';
})