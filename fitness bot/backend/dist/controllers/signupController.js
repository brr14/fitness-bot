"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
const zod_1 = require("zod");
const { user } = require("../models/db");
const JwtWebToken = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const userschema = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(20),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1)
});
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = userschema.safeParse(userData);
        if (!result.success) {
            return res.status(400).json(result.error.issues);
        }
        const { username, password, firstName, lastName } = userData;
        const userFound = yield user.findOne({
            username: { $regex: new RegExp(`^${username}$`, 'i') }
        });
        if (userFound) {
            return res.status(409).json({
                msg: "User already exists",
            });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield user.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });
        const token = jwt.sign({ username }, JwtWebToken, { expiresIn: '1d' });
        res.status(201).json({
            msg: "user successfully created",
            token: token
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "internal server error"
        });
    }
});
exports.signupController = signupController;
