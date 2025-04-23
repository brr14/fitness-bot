"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv = require('dotenv');
dotenv.config({ path: path_1.default.resolve(__dirname, "../.env") });
const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
