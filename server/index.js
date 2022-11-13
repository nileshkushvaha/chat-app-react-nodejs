const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const app = express();


const { port } = require("./config/config");
const connectDb = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use(cors());
app.options('*', cors());
app.use(express.json());

connectDb().catch((error) => console.error(error));

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

const io = socket(server, {
    cors : {
        origin: "http://localhost:3000",
        credential : true
    }
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    })
})