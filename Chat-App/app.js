const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);   
const io = new Server(server);

app.use(express.static("public"));

const users = new Map();

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on('join', (username) => {
        users.set(socket.id, { username, id: socket.id });
        io.emit('userJoined', { username, userId: socket.id, userCount: users.size });
        io.emit('updateUsers', Array.from(users.values()));
    });

    socket.on('message', (data) => {
        const user = users.get(socket.id);
        if (user) {
            io.emit('message', {
                username: user.username,
                text: data.text,
                timestamp: new Date().toISOString(),
                userId: socket.id
            });
        }
    });

    socket.on('typing', (isTyping) => {
        const user = users.get(socket.id);
        if (user) {
            socket.broadcast.emit('userTyping', { username: user.username, isTyping });
        }
    });

    socket.on("disconnect", () => {
        const user = users.get(socket.id);
        if (user) {
            users.delete(socket.id);
            io.emit('userLeft', { username: user.username, userCount: users.size });
            io.emit('updateUsers', Array.from(users.values()));
        }
        console.log("User disconnected");
    });
});

server.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:3000");
});
