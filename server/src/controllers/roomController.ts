import { Response, Request } from "express";
import { JWTCheck, RoomPriceRows } from "../interface/interfaces";
import roomService from "../services/roomService";
import { getRedis, msetRedis1D, setRedis, setRedis1D } from "../utils/redisUtils";
import dayjs from "dayjs";

const roomController = {
    async getRoomByHotel(req: Request, res: Response) {
        try {
            const timeStamp = dayjs().toISOString();
            const timeStampKey: string = `/timeStamp/room/roomInfo/hotelId/${req.params.id}`;
            const timeStampRedis = JSON.parse(await getRedis(timeStampKey));

            const key: string = `/room/roomInfo/hotelId/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (timeStampRedis === null) {
                setRedis1D(timeStampKey, timeStamp);
            }

            if (redisData === null || !dayjs(redisData.timeStamp).isSame(timeStampRedis)) {
                const data = await roomService.getRoomByHotel(req.params.id);

                setRedis1D(key, {
                    ...data,
                    timeStamp: timeStampRedis,
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
            const data = await roomService.getRoomByHotel(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getRoomById(req: Request, res: Response) {
        try {
            const timeStamp = dayjs().toISOString();
            const timeStampKey: string = `/timeStamp/room/roomInfo/roomId/${req.params.id}`;
            const timeStampRedis = JSON.parse(await getRedis(timeStampKey));

            const key: string = `/room/roomInfo/roomId/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (timeStampRedis === null) {
                setRedis1D(timeStampKey, timeStamp);
            }

            if (redisData === null || !dayjs(redisData.timeStamp).isSame(timeStampRedis)) {
                const data = await roomService.getRoomById(req.params.id);

                setRedis1D(key, {
                    ...data,
                    timeStamp: timeStampRedis,
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
            const data = await roomService.getRoomById(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getBedType(req: Request, res: Response) {
        try {
            const key: string = "/room/bedTypes";
            const redisData = await getRedis(key);

            if (redisData === null) {
                const data = await roomService.getBedType();

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
            const data = await roomService.getBedType();

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getViewType(req: Request, res: Response) {
        try {
            const key: string = "/room/viewTypes";
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
        try {
            const timeStamp = dayjs().toISOString();
            const timeStampKey: string = `/timeStamp/room/roomInfo/roomId/${req.params.id}`;
            const timeStampRedis = JSON.parse(await getRedis(timeStampKey));

            const key: string = `/room/roomImg/roomId/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (timeStampRedis === null) {
                setRedis1D(timeStampKey, timeStamp);
            }

            if (redisData === null || !dayjs(redisData.timeStamp).isSame(timeStampRedis)) {
                const data = await roomService.getRoomImgUrl(req.params.id);

                setRedis1D(key, {
                    ...data,
                    timeStamp: timeStampRedis,
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
            const data = await roomService.getRoomImgUrl(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },
    async regRoom(req: JWTCheck, res: Response) {
        const data = await roomService.regRoom(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async putRoomInfo(req: JWTCheck, res: Response) {
        const data = await roomService.putRoomInfo(req.user.id, req.body);

        const timeStamp = dayjs().toISOString();
        const pairs = [
            { key: `/timeStamp/room/roomInfo/hotelId/${req.body.hotel_id}`, data: timeStamp },
            { key: `/timeStamp/room/roomInfo/roomId/${req.body.room_id}`, data: timeStamp },
        ];

        msetRedis1D(pairs);

        res.status(200).json({
            error: null,
            data: data,
        });
    },

    async getPriceByRoomId(req: Request, res: Response) {
        const roomId: string = req.params.id;
        const checkInDate = dayjs(req.query.checkInDate as string).format("YYYY-MM-DD");
        const checkOutDate = dayjs(req.query.checkOutDate as string).format("YYYY-MM-DD");

        const filterByDate = (priceData: RoomPriceRows[]) => {
            if (checkInDate === checkOutDate) {
                return priceData;
            } else {
                return priceData.filter((price) => {
                    return dayjs(price.date).isAfter(dayjs(checkInDate).subtract(1, "day")) && dayjs(price.date).isBefore(checkOutDate, "day");
                });
            }
        };

        try {
            const timeStamp = dayjs().toISOString();
            const timeStampKey: string = `/timeStamp/room/price/roomId/${roomId}`;
            const timeStampRedis = JSON.parse(await getRedis(timeStampKey));

            const key: string = `/room/price/roomId/${roomId}`;
            const redisData = JSON.parse(await getRedis(key));

            if (timeStampRedis === null) {
                setRedis1D(timeStampKey, timeStamp);
            }

            if (redisData === null || !dayjs(redisData.timeStamp).isSame(timeStampRedis)) {
                const data = await roomService.getPriceByRoomId(roomId);

                setRedis1D(key, {
                    ...data,
                    timeStamp: timeStampRedis,
                });

                res.status(200).json({
                    error: null,
                    data: filterByDate(data),
                });
            } else {
                const { timeStamp, ...sortedRedisData } = redisData;

                res.status(200).json({
                    error: null,
                    data: filterByDate(Object.values(sortedRedisData)),
                });
            }
        } catch (error) {
            const data = await roomService.getPriceByRoomId(roomId);

            res.status(200).json({
                error: null,
                data: filterByDate(data),
            });
        }
    },

    async insertPriceByDate(req: JWTCheck, res: Response) {
        const data = await roomService.insertPriceByDate(req.user.id, req.body);

        const timeStamp = dayjs().toISOString();
        setRedis1D(`/timeStamp/room/price/roomId/${req.body.room_id}`, timeStamp);

        res.status(201).json({
            error: null,
            data: data,
        });
    },
    async insertPriceByMonth(req: JWTCheck, res: Response) {
        const data = await roomService.insertPriceByMonth(req.user.id, req.body);

        const timeStamp = dayjs().toISOString();
        setRedis1D(`/timeStamp/room/price/roomId/${req.body.room_id}`, timeStamp);

        res.status(201).json({
            error: null,
            data: data,
        });
    },
};
export default roomController;
