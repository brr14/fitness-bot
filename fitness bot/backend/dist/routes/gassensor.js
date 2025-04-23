"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gasSensorUploadController_1 = require("../controllers/gasSensorUploadController");
const gasSensorTimestampQueryController_1 = require("../controllers/gasSensorTimestampQueryController");
const gasSensorTopDataController_1 = require("../controllers/gasSensorTopDataController");
const router = express_1.default.Router();
router.post("/uploadgassensordata", gasSensorUploadController_1.gasSensorUploadController);
router.get("/timeddata", gasSensorTimestampQueryController_1.gasSensorTimeStampQueryController);
router.get("/alldata", gasSensorTopDataController_1.gasSensorTopDataController);
module.exports = router;
