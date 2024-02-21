import { Response } from "express"
import { JWTCheck } from "../interface/interfaces"
import hotelService from "../services/hotelService"

const hotelController = {
    async regHotel(req: JWTCheck, res: Response) {
        const urls = (req.files as any[]).map((file) => file.location)

        const data = await hotelService.regHotel(req.user.id, JSON.parse(req.body.data), urls)

        res.status(201).json({
            error: null,
            data: data,
        })
    },

    async myHotel(req: JWTCheck, res: Response) {
        const data = await hotelService.myHotel(req.user.id);

        res.status(200).json({
            error: null,
            data: data,
        })
    },

    async checkHotelById(req: JWTCheck, res: Response) {
        const data = await hotelService.checkHotelById(req.user.id, req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        })
    },
}

export default hotelController
