import { Request, Response } from 'express';
import { z } from "zod";
const { user } = require("../models/db");
const JwtWebToken = require("../config")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()

const signinSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6).max(20)
})

const signinController=async (req: Request, res: Response) => {
    
    try {
        const userData = req.body;
        
        const result = signinSchema.safeParse(userData);
        
        if (!result.success) {
            return res.status(400).json(result.error.issues);
        }
        
        const { username, password } = userData;

        const foundUser = await user.findOne({
            username
        })
        
        if (!foundUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        
        if (!passwordMatch) {
            return res.status(400).json({ msg: "Password does not match" });
        }
        const token = jwt.sign({ username }, JwtWebToken, { expiresIn: '1d' });
        
        return res.status(200).json({
            msg: "Successful login",
            token
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: "internal server error",
            error: e
        })
    }
}

export {signinController}