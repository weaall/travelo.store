import { Response, Request } from "express"
import { JWTCheck } from "../interface/interfaces"
import roomService from "../services/roomService";
import { getRedis, setRedis } from "../utils/redisUtils";

const roomController = {
    async getRoomByHotel(req: Request, res: Response) {
        const data = await roomService.getRoomByHotel(req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async getRoomById(req: Request, res: Response) {
        const data = await roomService.getRoomById(req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async getBedType(req: Request, res: Response) {
        try {
            const key: string = "bedTypes";
            const redisData = await getRedis(key);

            if (redisData === null) {
                const data = await roomService.getBedType();

                setRedis(key, data);

                res.status(200).json({
                    error: null,
                    data: data,
                });
            } else {
                console.log(JSON.parse(redisData).length);

                res.status(200).json({
                    error: null,
                    data: JSON.parse(redisData),
                });
            }
        } catch (error) {
            const data = await roomService.getBedType();

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getViewType(req: Request, res: Response) {
        try {
            const key: string = "viewTypes";
            const redisData = await getRedis(key);

            if (redisData === null) {
                const data = await roomService.getViewType();

                setRedis(key, data);

                res.status(200).json({
                    error: null,
                    data: data,
                });
            } else {
                res.status(200).json({
                    error: null,
                    data: JSON.parse(redisData),
                });
            }
        } catch (error) {
            const data = await roomService.getViewType();

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getRoomImgUrl(req: Request, res: Response) {
        const data = await roomService.getRoomImgUrl(req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },
    async regRoom(req: JWTCheck, res: Response) {
        const data = await roomService.regRoom(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },
    async putRoomInfo(req: JWTCheck, res: Response) {
        const urls = (req.files as any[]).map((file) => file.location);

        const data = await roomService.putRoomInfo(req.user.id, JSON.parse(req.body.data), urls);

        res.status(201).json({
            error: null,
            data: data,
        });
    },
    async getPriceByRoomId(req: Request, res: Response) {
        const data = await roomService.getPriceByRoomId(req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },
    async insertPriceByDate(req: JWTCheck, res: Response) {
        const data = await roomService.insertPriceByDate(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },
    async insertPriceByMonth(req: JWTCheck, res: Response) {
        const data = await roomService.insertPriceByMonth(req.user.id, req.body);

        try {
            const redisData = await roomService.getPriceByRoomId(req.body.room_id);
            const key: string = `/room/price/${req.body.room_id}`;
            setRedis(key, redisData);
        } catch (error) {
            res.status(200).json({
                error: null,
                data: data,
            });
        }

        res.status(201).json({
            error: null,
            data: data,
        });
    },
};
export default roomController;
