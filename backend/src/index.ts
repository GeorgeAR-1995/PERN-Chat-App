import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser()); //cookie parser
app.use(express.json()); //application/json parser

const port = process.env.PORT || 5001; 

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);


app.listen(port, () => {
    console.log(`server is now running on port ${port}`);
});

//to dos: Add socket.io to the server
//configure server for deployment


