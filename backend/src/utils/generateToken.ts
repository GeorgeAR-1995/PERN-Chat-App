import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (userId: string, res: Response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: "15d"
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true, //prevent XSS
        sameSite: "strict", //CSRF prevention
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
};

export default generateToken;