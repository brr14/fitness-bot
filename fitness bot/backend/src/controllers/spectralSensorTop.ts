import { Request, Response } from "express";
import { SpectralSensor } from "../models/db"; 





const spectalSensorTopcontroller = async (req: Request, res: Response) : Promise<any>=> {
    try {
        const found = await SpectralSensor.find({}).limit(40);

        return res.status(200).json({
            msg: "All data retreived successfully",
            data:found
        })


    } catch (e) {
        return res.status(500).json({
            msg: "internal server error",
            error:e
        })
    }
}

export {spectalSensorTopcontroller}