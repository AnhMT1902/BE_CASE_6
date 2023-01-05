import {Request, Response} from "express";
import CityService from "../service/cityService";

class CityController {
    getAllCity = async (req: Request, res: Response) => {
        try {
            let city = CityService.getAllCity()
            return res.status(200).json(city)
        } catch (err) {
            return res.status(200).json(err)
        }
    }
}

export default new CityController()