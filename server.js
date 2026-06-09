const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./config/db.connection");
const http = require("http");
const { Server } = require("socket.io");
const INDEX_ROUTE = require("./routes/Index.route");
const messageModel = require("./model/message.model");
const cors = require("cors");

dotenv.config();
connectdb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", INDEX_ROUTE);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatweb-1b275.web.app",
    methods: ["GET", "POST"],
  },
});


const users = {};

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // JOIN USER
  socket.on("join", (userId) => {
    users[userId] = socket.id;
    console.log("User joined:", userId);
  });

  // SEND MESSAGE
  socket.on("sendMessage", async (data) => {
    try {
      const savedMessage = await messageModel.create({
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
      });

      const receiverSocketId = users[data.receiverId];

      // send to receiver
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", savedMessage);
      }
      socket.emit("receiveMessage", savedMessage);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);

    // cleanup user map
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
      }
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});