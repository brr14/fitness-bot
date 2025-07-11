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
exports.gasSensorTopDataController = void 0;
const db_1 = require("../models/db");
const gasSensorTopDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const found = yield db_1.GasSensor.find({}).limit(100);
        return res.status(200).json({
            msg: "All data retreived successfully",
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
exports.gasSensorTopDataController = gasSensorTopDataController;
