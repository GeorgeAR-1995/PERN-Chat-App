import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs, { hash } from "bcryptjs";
import { Gender } from "@prisma/client"; // Importing Prisma client types
import generateToken from "../utils/generateToken.js";

interface SignupRequestBody {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    //this gender type is imported from prisma as it is not a string but an enum
    gender: Gender;
}

export const signup = async (req: Request, res: Response) => {

    try {
        const { fullName, username, password, confirmPassword, gender } = req.body as SignupRequestBody;

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            res.status(400).json({ error: "Please fill out all fields." })
            return;
        }

        if (password !== confirmPassword) {
            res.status(400).json({ error: "Please ensure passwords match." })
            return;
        }

        const user = await prisma.user.findUnique({ where: { username } });

        if (user) {
            res.status(400).json({ error: "Username already in use, please choose another." })
            return;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        //profile pics from https://avatar-placeholder.iran.liara.run/document
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? maleProfilePic : femaleProfilePic,
            }
        });

        if (newUser) {
            generateToken(newUser.id, res)

            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({ error: "Invalid user data." });
        }

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const login = async (req: Request, res: Response) => {}



export const logout = async (req: Request, res: Response) => {}




