import { JWTCheck } from "../interface/interfaces";
import { Request, Response } from "express";
import userService from "../services/userService";
import { getRedis, setRedis1D } from "../utils/redisUtils";

const userController = {
    async me(req: JWTCheck, res: Response) {
        try {
            const key: string = `/user/${req.user.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await userService.me(req.user.id);

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
            const data = await userService.me(req.user.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async putMyInfo(req: JWTCheck, res: Response) {
        const user = await userService.putMyInfo(req.user.id, req.body);

        const key: string = `/user/${req.user.id}`;
        const data = await userService.me(req.user.id);
        setRedis1D(key, data);

        res.status(201).json({
            error: null,
            data: user,
        });
    },

    async getNameByUserId(req: Request, res: Response) {
        try {
            const key: string = `/user/name/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await userService.getNameByUserId(req.params.id);

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
            const data = await userService.getNameByUserId(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async checkEmail(req: Request, res: Response) {
        try {
            const key: string = `/user/email/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await userService.checkEmail(req.params.id);

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
            const data = await userService.checkEmail(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },
};
export default userController;
