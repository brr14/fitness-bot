"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = require("./user");
const gasSensorRouter = require("./gassensor");
const spectralSensorRouter = require("./spectralSensor");
const router = express_1.default.Router();
router.use("/user", userRouter);
router.use("/sensor/gassensor", gasSensorRouter);
router.use("/sensor/spectralsensor", spectralSensorRouter);
module.exports = router;
