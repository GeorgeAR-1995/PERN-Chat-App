import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

import cookieParser from "cookie-parser";

import { Server } from "socket.io";
import cors from 'cors';


import dotenv from "dotenv";
import { server } from "./socket/socket.js";

dotenv.config();

const app = express();

// Enable CORS for requests from the frontend
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true 
}));

app.use(cookieParser()); //cookie parser
app.use(express.json()); //application/json parser

const port = process.env.PORT || 5001; 

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// Initialize Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

app.listen(port, () => {
    console.log(`server is now running on port ${port}.`);
});

//to dos: Add socket.io to the server
//configure server for deployment


