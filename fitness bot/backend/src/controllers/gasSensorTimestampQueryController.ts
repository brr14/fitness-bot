import { Request, Response } from "express";
import { GasSensor } from "../models/db"; 


const gasSensorTimeStampQueryController = async (req: Request, res: Response) : Promise<any> => {
    try {
        const startDate = typeof req.query.startDate === "string" ? req.query.startDate : "";
        const endDate = typeof req.query.endDate === "string" ? req.query.endDate : "";

        if (!startDate || !endDate) {
            return res.status(400).json({ msg: "Missing Start Date or End Date" });
        }

        const found = await GasSensor.find({
            timeStamp: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        return res.status(200).json({
            msg: "Data retrieved successfully",
            data: found
        });

    } catch (e) {
        return res.status(500).json({
            msg: "Internal server error",
            error: e
        });
    }
}



export {gasSensorTimeStampQueryController}