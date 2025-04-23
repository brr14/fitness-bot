import { Request, Response } from 'express';
import { z } from "zod";
const { user } = require("../models/db");
const JwtWebToken = require("../config")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()

const userschema = z.object({
    username: z.string().email(),
    password: z.string().min(6).max(20),
    firstName: z.string().min(1),
    lastName: z.string().min(1)

})

const signupController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        const result = userschema.safeParse(userData);

        if (!result.success) {
            return res.status(400).json(result.error.issues);
        }


        const { username, password, firstName, lastName } = userData;

        const userFound = await user.findOne({
            username: { $regex: new RegExp(`^${username}$`, 'i') }
        })


        if (userFound) {
            return res.status(409).json({
                msg: "User already exists",
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await user.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });
        const token = jwt.sign({ username }, JwtWebToken, { expiresIn: '1d' });


        res.status(201).json({
            msg: "user successfully created",
            token: token
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}

export { signupController }