import express from "express";
const userRouter = require("./user"); 
const gasSensorRouter = require("./gassensor"); 
const spectralSensorRouter = require("./spectralSensor"); 
const router = express.Router();

router.use("/user", userRouter);
router.use("/sensor/gassensor", gasSensorRouter);
router.use("/sensor/spectralsensor",spectralSensorRouter);
module.exports = router; 
