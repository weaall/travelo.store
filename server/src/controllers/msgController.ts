import { Response, Request } from "express";
import { JWTCheck } from "../interface/interfaces";
import { getRedis, setRedis1D } from "../utils/redisUtils";
import msgService from "../services/msgService";
import dayjs from "dayjs";

const msgController = {
    async sendMsg(req: JWTCheck, res: Response) {
        const data = await msgService.sendMsg(req.user.id, req.body);

        const timeStamp = dayjs().toISOString();
        const timeStampKeyMsgListUser: string = `/timeStamp/msg/list/user/${req.user.id}`;
        const timeStampKeyMsgListHotel: string = `/timeStamp/msg/list/hotel/${req.body.hotel_id}`;
        const timeStampKeyChat: string = `/timeStamp/msg/chat/${req.user.id}/${req.body.hotel_id}`;
        await Promise.all([
            setRedis1D(timeStampKeyMsgListUser, JSON.stringify(timeStamp )),
            setRedis1D(timeStampKeyMsgListHotel, JSON.stringify(timeStamp )),
            setRedis1D(timeStampKeyChat, JSON.stringify(timeStamp))
        ]);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async sendMsgFromHotel(req: JWTCheck, res: Response) {
        const data = await msgService.sendMsgFromHotel(req.user.id, req.body);

        const timeStamp = dayjs().toISOString();
        const timeStampKeyMsgListUser: string = `/timeStamp/msg/list/user/${req.body.user_id}`;
        const timeStampKeyMsgListHotel: string = `/timeStamp/msg/list/hotel/${req.body.hotel_id}`;
        const timeStampKeyChat: string = `/timeStamp/msg/chat/${req.body.user_id}/${req.body.hotel_id}`;
        await Promise.all([
            setRedis1D(timeStampKeyMsgListUser, JSON.stringify(timeStamp)),
            setRedis1D(timeStampKeyMsgListHotel, JSON.stringify(timeStamp)),
            setRedis1D(timeStampKeyChat, JSON.stringify(timeStamp))
        ]);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async getMsgListByUser(req: JWTCheck, res: Response) {
        try {
            const timeStamp = dayjs().toISOString();
            const timeStampKey: string = `/timeStamp/msg/list/user/${req.user.id}`;
            const timeStampRedis = JSON.parse(await getRedis(timeStampKey));

            const key: string = `/msg/list/user/${req.user.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (timeStampRedis === null) {
                setRedis1D(timeStampKey, timeStamp);
            }

            if (redisData === null || !dayjs(JSON.parse(redisData.timeStamp)).isSame(JSON.parse(timeStampRedis))) {
                const data = await msgService.getMsgListByUser(req.user.id);
                
                setRedis1D(key, {
                    ...data,
                    timeStamp: timeStampRedis
                });

                console.log("msglist user rdb")

                res.status(200).json({
                    error: null,
                    data: data,
                });
            } else {
                const { timeStamp, ...sortedRedisData } = redisData;

                console.log("msglist user redis")
                
                res.status(200).json({
                    error: null,
                    data: Object.values(sortedRedisData),
                });
            }
        } catch (error) {
            const data = await msgService.getMsgListByUser(req.user.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getMsgListByHotel(req: JWTCheck, res: Response) {
        try {
            const timeStamp = dayjs().toISOString();
            const timeStampKey: string = `/timeStamp/msg/list/hotel/${req.params.id}`;
            const timeStampRedis = JSON.parse(await getRedis(timeStampKey));
            
            const key: string = `/msg/list/hotel/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (timeStampRedis === null) {
                setRedis1D(timeStampKey, timeStamp);
            }

            if (redisData === null || !dayjs(redisData.timeStamp).isSame(timeStampRedis)) {
                const data = await msgService.getMsgListByHotel(req.user.id, req.params.id);

                setRedis1D(key, {
                    ...data,
                    timeStampRedis,
                });

                res.status(200).json({
                    error: null,
                    data: data,
                });
            } else {
                const { timeStamp, ...sortedRedisData } = redisData;

                res.status(200).json({
                    error: null,
                    data: Object.values(sortedRedisData),
                });
            }
        } catch (error) {
            const data = await msgService.getMsgListByHotel(req.user.id, req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getChatByUser(req: JWTCheck, res: Response) {
        try {
            const timeStampKeyMsgListUser: string = `/timeStamp/msg/list/user/${req.user.id}`;
            const timeStamp = dayjs().toISOString();
            const timeStampKey: string = `/timeStamp/msg/chat/${req.user.id}/${req.params.id}`;
            const timeStampRedis = JSON.parse(await getRedis(timeStampKey));

            const key: string = `/msg/chat/user/${req.user.id}/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (timeStampRedis === null) {
                setRedis1D(timeStampKey, timeStamp);
            }

            if (redisData === null || !dayjs(redisData.timeStamp).isSame(timeStampRedis)) {
                const data = await msgService.getChatByUser(req.user.id, req.params.id);

                setRedis1D(key, {
                    ...data,
                    timeStampRedis,
                });
                setRedis1D(timeStampKeyMsgListUser, timeStamp)

                res.status(200).json({
                    error: null,
                    data: data,
                });
            } else {
                const { timeStamp, ...sortedRedisData } = redisData;

                res.status(200).json({
                    error: null,
                    data: Object.values(sortedRedisData),
                });
            }
        } catch (error) {
            const data = await msgService.getChatByUser(req.user.id, req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getChatByHotel(req: JWTCheck, res: Response) {
        const hotel_id = req.params.hotel_id;
        const user_id = req.params.user_id;
        try {
            const timeStamp = dayjs().toISOString();
            const timeStampKey: string = `/timeStamp/msg/chat/${user_id}/${hotel_id}`;
            const timeStampRedis = JSON.parse(await getRedis(timeStampKey));

            const key: string = `/msg/chat/hotel/${user_id}/${hotel_id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (timeStampRedis === null) {
                setRedis1D(timeStampKey, timeStamp);
            }

            if (redisData === null || !dayjs(redisData.timeStamp).isSame(timeStampRedis)) {
                const data = await msgService.getChatByHotel(req.user.id, hotel_id, user_id);

                setRedis1D(key, {
                    ...data,
                    timeStampRedis,
                });

                res.status(200).json({
                    error: null,
                    data: data,
                });
            } else {
                const { timeStamp, ...sortedRedisData } = redisData;

                res.status(200).json({
                    error: null,
                    data: Object.values(sortedRedisData),
                });
            }
        } catch (error) {
            const data = await msgService.getChatByHotel(req.user.id, hotel_id, user_id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },
};

export default msgController;
