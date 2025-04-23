import express, { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import mime from "mime-types"; 
import { spectralSensorTimeStampQueryController } from "../controllers/spectralSensorTimestampQuery";
import { spectalSensorTopcontroller } from "../controllers/spectralSensorTop";
import { SpectralSensor } from "../models/db";

const router: Router = express.Router();
const imageDirectory = path.join(__dirname, "../../public/images"); // Adjust if needed

router.get("/images/:imageName", async (req: Request, res: Response): Promise<void> => {
    try {
        const imageName = req.params.imageName;
        const imagePath = path.join(imageDirectory, imageName);
        // console.log(imagePath);
        
        if (!fs.existsSync(imagePath)) {
            res.status(404).json({ error: "Image not found" });
            return; 
        }

        const mimeType = mime.lookup(imagePath) || "application/octet-stream";
        res.contentType(mimeType);

        
        const imageBuffer = await fs.promises.readFile(imagePath);
        res.send(imageBuffer);
    } catch (error) {
        console.error("Error serving image:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/timeddata",spectralSensorTimeStampQueryController);
router.get("/alldata",spectalSensorTopcontroller);


module.exports = router;
