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
exports.gasSensorUploadController = void 0;
const db_1 = require("../models/db");
const zod_1 = require("zod");
const gasSensorSchema = zod_1.z.object({
    timestamp: zod_1.z.string().datetime(),
    channel1: zod_1.z.number(),
    channel2: zod_1.z.number(),
    channel3: zod_1.z.number(),
    channel4: zod_1.z.number(),
});
const gasSensorUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { success, error } = gasSensorSchema.safeParse(data);
        if (!success) {
            return res.status(400).json({
                msg: "Invalid data",
                error: error.errors
            });
        }
        const { timestamp, channel1, channel2, channel3, channel4 } = data;
        const previousEntry = yield db_1.GasSensor.findOne({
            timeStamp: new Date(timestamp)
        });
        if (previousEntry) {
            return res.status(409).json({
                msg: "Data already exists"
            });
        }
        yield db_1.GasSensor.create({
            timeStamp: new Date(timestamp),
            channel1,
            channel2,
            channel3,
            channel4
        });
        return res.status(201).json({
            msg: "Data successfully uploaded"
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: "Internal server error",
            error: e
        });
    }
});
exports.gasSensorUploadController = gasSensorUploadController;
