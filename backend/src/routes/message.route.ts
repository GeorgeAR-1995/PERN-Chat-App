import express from 'express';

const messageRoute = express.Router();

messageRoute.get("/conversation", (req, res) => {
    res.send("conversation route")
});

export default messageRoute;