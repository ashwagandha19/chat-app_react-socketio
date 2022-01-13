const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

//& DEEEEEECI cand folosesti http.createServer() practic creezi un server in Node, si folosesti http.listen (sau, ma rog, server.listen() in cazul de fata). Cand creezi serverul in express folosesti app.listen(). Nu e cine stie ce vrajeala :D .

//* destructurez obiectul Server
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

//^ serverul de socket.io practic integreaza/se adauga peste serverul HTTP

const io = new Server(server, {
    //* accept socket communication with our react app
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.get('/', (req, res) => {
    res.send("This is the home page");
});

io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);

    socket.on("join_room", (data) => {
        console.log(data);
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(data);
    });

    socket.on("disconnect", () => {
        console.log(`user disconnected ${socket.id}`);
    })
})




server.listen(3001, () => {
    console.log("server running");
})