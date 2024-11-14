import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { Request, Response, NextFunction } from "express";

//this function ensures the route is protected i.e. the token has been verified before any action can be done

interface DecodedToken extends JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string;
            }
        }
    }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            res.status(401).json({ error: "Unauthorised - No token provided." })
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded) {
            res.status(401).json({ error: "Unauthorised - Invalid token." })
            return;
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, 
            select: { id: true, username: true, fullName: true, profilePic: true} });

        if (!user) {
            res.status(404).json({ error: "User not found." });
        }

        req.user = user //in order to get this to work you can either do req.user = user! or in tsconfig set strictNullChecks=false

        next();

    } catch (error: any) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal server error." })
    }
};

export default protectRoute;