import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { sendMessage, getMessages, getUsersForSidebar } from '../controllers/message.controller.js';

const messageRoute = express.Router();

messageRoute.get("/conversations", protectRoute, getUsersForSidebar);
messageRoute.get("/:id", protectRoute, getMessages);
messageRoute.post("/send/:id", protectRoute, sendMessage);

export default messageRoute;