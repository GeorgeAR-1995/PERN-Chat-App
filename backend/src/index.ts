import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

import cookieParser from "cookie-parser";

import { Server } from "socket.io";
import cors from 'cors';

import path from "path";


import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT || 5001; 
const __dirname = path.resolve();

// Enable CORS for requests from the frontend
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true 
}));

app.use(cookieParser()); //cookie parser
app.use(express.json()); //application/json parser


app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

if(process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
};

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

server.listen(port, () => {
    console.log(`server is now running on port ${port}.`);
});



