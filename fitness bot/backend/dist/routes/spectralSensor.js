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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mime_types_1 = __importDefault(require("mime-types"));
const spectralSensorTimestampQuery_1 = require("../controllers/spectralSensorTimestampQuery");
const spectralSensorTop_1 = require("../controllers/spectralSensorTop");
const router = express_1.default.Router();
const imageDirectory = path_1.default.join(__dirname, "../../public/images"); // Adjust if needed
router.get("/images/:imageName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = req.params.imageName;
        const imagePath = path_1.default.join(imageDirectory, imageName);
        // console.log(imagePath);
        if (!fs_1.default.existsSync(imagePath)) {
            res.status(404).json({ error: "Image not found" });
            return;
        }
        const mimeType = mime_types_1.default.lookup(imagePath) || "application/octet-stream";
        res.contentType(mimeType);
        const imageBuffer = yield fs_1.default.promises.readFile(imagePath);
        res.send(imageBuffer);
    }
    catch (error) {
        console.error("Error serving image:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.get("/timeddata", spectralSensorTimestampQuery_1.spectralSensorTimeStampQueryController);
router.get("/alldata", spectralSensorTop_1.spectalSensorTopcontroller);
module.exports = router;
