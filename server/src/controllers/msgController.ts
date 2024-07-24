import { Response, Request } from "express";
import { JWTCheck } from "../interface/interfaces";
import { getRedis, setRedis, setRedis1D } from "../utils/redisUtils";
import msgService from "../services/msgService";

const msgController = {
    async sendMsg(req: JWTCheck, res: Response) {
        const data = await msgService.sendMsg(req.user.id, req.body);

        const key: string = `/msg/both/${req.user.id}/${req.body.hotel_id}`;
        const redisData = await msgService.getMsgByBothId(req.user.id, req.body.hotel_id);
        setRedis1D(key, redisData);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async sendMsgFromHotel(req: JWTCheck, res: Response) {
        const data = await msgService.sendMsgFromHotel(req.user.id, req.body);

        const getMsgByBothIdKey: string = `/msg/both/${req.user.id}/${req.body.hotel_id}`;
        const getMsgByBothId = await msgService.getMsgByBothId(req.user.id, req.body.hotel_id);
        setRedis1D(getMsgByBothIdKey, getMsgByBothId);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async getMsgFromHotel(req: JWTCheck, res: Response) {
        const hotel_id = req.params.hotel_id;
        const user_id = req.params.user_id;
        const data = await msgService.getMsgFromHotel(req.user.id, hotel_id, user_id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async getMsgByUserId(req: JWTCheck, res: Response) {
        try {
            const key: string = `/msg/${req.user.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await msgService.getMsgByUserId(req.user.id);

                setRedis1D(key, data);

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
            const data = await msgService.getMsgByUserId(req.user.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getMsgByHotelId(req: JWTCheck, res: Response) {
        try {
            const key: string = `/msg/hotel/${req.user.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await msgService.getMsgByHotelId(req.user.id, req.params.id);

                setRedis1D(key, data);

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
            const data = await msgService.getMsgByHotelId(req.user.id, req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getMsgByBothId(req: JWTCheck, res: Response) {
        try {
            const key: string = `/msg/both/${req.user.id}/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await msgService.getMsgByBothId(req.user.id, req.params.id);

                setRedis1D(key, data);

                const getMsgByUserIdKey: string = `/msg/${req.user.id}`;
                const getMsgByUserId = await msgService.getMsgByUserId(req.user.id);
                setRedis1D(getMsgByUserIdKey, getMsgByUserId);

                res.status(200).json({
                    error: null,
                    data: data,
                });
            } else {
                await msgService.updateChecked(req.user.id, req.params.id);

                const getMsgByUserIdKey: string = `/msg/${req.user.id}`;
                const getMsgByUserId = await msgService.getMsgByUserId(req.user.id);
                setRedis1D(getMsgByUserIdKey, getMsgByUserId);

                res.status(200).json({
                    error: null,
                    data: redisData,
                });
            }
        } catch (error) {
            const data = await msgService.getMsgByBothId(req.user.id, req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },
};

export default msgController;
