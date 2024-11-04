import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { sendMessage, getMessages } from '../controllers/message.controller.js';

const messageRoute = express.Router();

messageRoute.post("/send/:id", protectRoute, sendMessage);
messageRoute.get("/:id", protectRoute, getMessages);

export default messageRoute;