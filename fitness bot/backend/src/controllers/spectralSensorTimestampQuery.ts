import { Request, Response } from "express";
import { SpectralSensor } from "../models/db"; 


const spectralSensorTimeStampQueryController = async (req: Request, res: Response) : Promise<any>=> {
    try {
        const startDate = typeof req.query.startDate === "string" ? req.query.startDate : "";
        const endDate = typeof req.query.endDate === "string" ? req.query.endDate : "";

        
        if (!startDate || !endDate) {
            return res.status(400).json({ msg: "Missing startDate or endDate" });
        }

     
        const found = await SpectralSensor.find({
            Timestamp: { 
                $gte: new Date(startDate), 
                $lt: new Date(endDate) 
            }
        });

        
        // console.log(found);
        // console.log(startDate," ",endDate);
        return res.status(200).json({
            msg: "data retreived successfully",
            data:found
            
        })


    } catch (e) {
        return res.status(500).json({
            msg: "internal server error",
            error:e
        })
    }
}

export {spectralSensorTimeStampQueryController}