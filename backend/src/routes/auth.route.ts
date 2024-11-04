import express from 'express';
import { signup, login, logout, getMe } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const authRoute = express.Router();

//remember - these are prefixed with http://localhost:5001/api/auth/
authRoute.get("/me", protectRoute, getMe);
authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.post("/logout", logout);



export default authRoute;