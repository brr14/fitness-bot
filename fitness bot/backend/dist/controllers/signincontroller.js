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
exports.signinController = void 0;
const zod_1 = require("zod");
const { user } = require("../models/db");
const JwtWebToken = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const signinSchema = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(20)
});
const signinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = signinSchema.safeParse(userData);
        if (!result.success) {
            return res.status(400).json(result.error.issues);
        }
        const { username, password } = userData;
        const foundUser = yield user.findOne({
            username
        });
        if (!foundUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        const passwordMatch = yield bcrypt.compare(password, foundUser.password);
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
        });
    }
});
exports.signinController = signinController;
