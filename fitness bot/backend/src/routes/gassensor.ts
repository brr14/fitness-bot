import express from "express";
import {gasSensorUploadController} from "../controllers/gasSensorUploadController";
import { gasSensorTimeStampQueryController } from "../controllers/gasSensorTimestampQueryController";
import { gasSensorTopDataController } from "../controllers/gasSensorTopDataController";

const router = express.Router();

router.post("/uploadgassensordata", gasSensorUploadController);
router.get("/timeddata",gasSensorTimeStampQueryController);
router.get("/alldata",gasSensorTopDataController);
module.exports = router;
