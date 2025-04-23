import { Request, Response } from "express";
import { GasSensor } from "../models/db"; 





const gasSensorTopDataController = async (req: Request, res: Response) : Promise<any>=> {
    try {
        const found = await GasSensor.find({}).limit(100);

        return res.status(200   ).json({
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

export {gasSensorTopDataController}