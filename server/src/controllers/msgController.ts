import { Response, Request } from "express";
import { JWTCheck } from "../interface/interfaces";
import { getRedis, setRedis } from "../utils/redisUtils";
import msgService from "../services/msgService";

const msgController = {
    async addMsg(req: JWTCheck, res: Response) {
        const data = await msgService.addMsg(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async getMsgByBothId(req: JWTCheck, res: Response) {
        const data = await msgService.getMsgByBothId(req.user.id, req.params.id);

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
            const data = await msgService.getMsgByUserId(req.user.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },
};

export default msgController;
