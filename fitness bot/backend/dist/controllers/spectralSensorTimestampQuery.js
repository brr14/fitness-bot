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
exports.spectralSensorTimeStampQueryController = void 0;
const db_1 = require("../models/db");
const spectralSensorTimeStampQueryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startDate = typeof req.query.startDate === "string" ? req.query.startDate : "";
        const endDate = typeof req.query.endDate === "string" ? req.query.endDate : "";
        if (!startDate || !endDate) {
            return res.status(400).json({ msg: "Missing startDate or endDate" });
        }
        const found = yield db_1.SpectralSensor.find({
            Timestamp: {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            }
        });
        // console.log(found);
        // console.log(startDate," ",endDate);
        return res.status(200).json({
            msg: "data retreived successfully",
            data: found
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: "internal server error",
            error: e
        });
    }
});
exports.spectralSensorTimeStampQueryController = spectralSensorTimeStampQueryController;
