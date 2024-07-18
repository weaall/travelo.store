import { Response, Request } from "express"
import { JWTCheck } from "../interface/interfaces"
import hotelService from "../services/hotelService"
import { getRedis, setRedis } from "../utils/redisUtils";
import { getHotelRows, getSearchRows } from "../interface/mysql.interface";

const hotelController = {
    async getHotel(req: Request, res: Response) {
        const data = await hotelService.getHotel();

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async getHotelById(req: Request, res: Response) {
        try {
            const key: string = `/hotel/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await hotelService.getHotelById(req.params.id);

                setRedis(key, data);

                res.status(200).json({
                    error: null,
                    data: data,
                });
            } else {
                res.status(200).json({
                    error: null,
                    data: redisData,
                });
            }
        } catch (error) {
            const data = await hotelService.getHotelById(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async regHotel(req: JWTCheck, res: Response) {
        const data = await hotelService.regHotel(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async getMyHotel(req: JWTCheck, res: Response) {
        const data = await hotelService.getMyHotel(req.user.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async checkHotelById(req: JWTCheck, res: Response) {
        const data = await hotelService.checkHotelById(req.user.id, req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async getHotelInfoById(req: JWTCheck, res: Response) {
        const data = await hotelService.getHotelInfoById(req.user.id, req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async getHotelImgUrl(req: Request, res: Response) {
        const data = await hotelService.getHotelImgUrl(req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async putHotelInfo(req: JWTCheck, res: Response) {
        const data = await hotelService.putHotelInfo(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async putHotelServ(req: JWTCheck, res: Response) {
        const data = await hotelService.putHotelServ(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async putHotelFacil(req: JWTCheck, res: Response) {
        const data = await hotelService.putHotelFacil(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },
};

export default hotelController
