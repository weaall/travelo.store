import { Response, Request } from "express"
import { JWTCheck } from "../interface/interfaces"
import hotelService from "../services/hotelService"
import client from "../config/redis";

const hotelController = {
    async getHotel(req: Request, res: Response) {
        const key : string = req.body;
        const redisData = client.get(key);
        console.log(redisData)

        const data = await hotelService.getHotel();


        res.status(200).json({
            error: null,
            data: data,
        })
    },
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

    async getHotelInfoById(req: JWTCheck, res: Response) {
        const data = await hotelService.getHotelInfoById(req.user.id, req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        })
    },

    async getHotelImgUrl(req: Request, res: Response){
        const data = await hotelService.getHotelImgUrl(req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async putHotelInfo(req: JWTCheck, res: Response) {
        const urls = (req.files as any[]).map((file) => file.location)

        const data = await hotelService.putHotelInfo(req.user.id, JSON.parse(req.body.data), urls)

        res.status(201).json({
            error: null,
            data: data,
        })
    },

    async putHotelServ(req: JWTCheck, res: Response) {
        const data = await hotelService.putHotelServ(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        })
    },

    async putHotelFacil(req: JWTCheck, res: Response) {
        const data = await hotelService.putHotelFacil(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        })
    },
}

export default hotelController
