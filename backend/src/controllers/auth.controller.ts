import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs, { hash } from "bcryptjs";
import generateToken from "../utils/generateToken.js";

interface SignupRequestBody {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    //this gender type is imported from prisma as it is not a string but an enum
    gender: string;
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


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            res.status(400).json({ error: "Invalid credentials."})
            return;
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            res.status(400).json({ error: "Invalid credentials."})
            return;
        }

        generateToken(user.id, res);

        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error: any) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error."})
    }
};


export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error: any) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error."})
    }
};


export const getMe = async (req: Request, res: Response) => {
    try { 
        const user = await prisma.user.findUnique({ where:{ id:req.user.id }});

        if(!user) {
            res.status(404).json({ error: "User not found." })
            return;
        }

        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error: any) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal server error."})
    }
};


