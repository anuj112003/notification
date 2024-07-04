

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('new_user_login', (data) => {
        console.log('new user login', data.message);
        io.emit('new_user_login', { message: data.message });
    });
});

server.listen(3005, () => {
    console.log('Server started on port 3005');
});
