import { Response } from "express"
import { JWTCheck } from "../interface/interfaces";
import hotelService from "../services/hotelService"

const hotelController = {
    async regHotel(req: JWTCheck, res: Response) {
        const urls = (req.files as any[]).map((file) => file.location)

        console.log("req.user.id : ",req.user.id)
        console.log("req.body : ", req.body)
        console.log("urls: ", urls)

        const data = await hotelService.regHotel(req.user.id,req.body, urls)

        res.status(201).json({
            error: null,
            data: data,
        })
    },
}

export default hotelController
