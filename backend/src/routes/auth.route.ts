import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';


const authRoute = express.Router();

//remember - these are prefixed with http://localhost:5001/api/auth/
authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.post("/logout", logout);



export default authRoute;