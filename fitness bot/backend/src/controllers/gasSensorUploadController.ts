import { Request, Response } from "express";
import { GasSensor } from "../models/db"; 
import { z } from "zod";

const gasSensorSchema = z.object({
    timestamp: z.string().datetime(),
    channel1: z.number(),
    channel2: z.number(),
    channel3: z.number(),
    channel4: z.number(),
});

const gasSensorUploadController = async (req: Request, res: Response): Promise<any> => {
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

        const previousEntry = await GasSensor.findOne({
            timeStamp: new Date(timestamp) 
        });

        if (previousEntry) {
            return res.status(409).json({
                msg: "Data already exists"
            });
        }

        await GasSensor.create({
            timeStamp: new Date(timestamp),
            channel1,
            channel2,
            channel3,
            channel4
        });

        return res.status(201).json({
            msg: "Data successfully uploaded"
        });

    } catch (e) {
        
        return res.status(500).json({
            msg: "Internal server error",
            error: e
        });
    }
};

export { gasSensorUploadController };
