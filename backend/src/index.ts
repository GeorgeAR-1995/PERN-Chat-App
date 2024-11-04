import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

const port = "5001";

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);


app.listen(port, () => {
    console.log(`server is now running on port ${port}`);
});


