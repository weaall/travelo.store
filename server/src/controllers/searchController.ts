import { Response, Request } from "express";
import searchService from "../services/searchService";
import { getRedis, setRedis, setRedis1H } from "../utils/redisUtils";
import dayjs from "dayjs";
import { RoomPriceRows } from "../interface/interfaces";

export const searchController = {
    async getSearch(req: Request, res: Response) {
        const searchValue = decodeURIComponent(req.query.searchValue as string);
        const startDate = dayjs(req.query.startDate as string).format("YYYY-MM-DD");
        const endDate = dayjs(req.query.endDate as string).format("YYYY-MM-DD");
        const adult = req.query.adult as string;
        const child = req.query.child as string;
        const personNum = parseInt(adult) + parseInt(child)

        try {
            const key: string = `/search/${searchValue}/${personNum}`;
            const redisData = await getRedis(key);

            if (redisData === null) {
                let data = await searchService.getSearch({ searchValue, personNum });

                setRedis1H(key, data);

                for (let i = 0; i < data.length; i++) {
                    const priceKey: string = `/room/price/${data[i].room_id}`;
                    const redisPriceData = await getRedis(priceKey);

                    if (redisPriceData === null) {
                        const sqlPriceData = await searchService.getPriceByRoomId(data[i].room_id);

                        setRedis(priceKey, sqlPriceData);

                        const filteredPriceData = sqlPriceData.filter((price) => {
                            return dayjs(price.date).isAfter(startDate) && dayjs(price.date).isBefore(endDate);
                        });

                        data[i].room_price = filteredPriceData;
                    } else {
                        const filteredPriceData = JSON.parse(redisPriceData).filter((price: RoomPriceRows) => {
                            return dayjs(price.date).isAfter(startDate) && dayjs(price.date).isBefore(endDate);
                        });

                        data[i].room_price = filteredPriceData;
                    }
                }

                res.status(200).json({
                    error: null,
                    data: data,
                });
            } else {
                let data = JSON.parse(redisData);

                for (let i = 0; i < data.length; i++) {
                    const priceKey: string = `/room/price/${data[i].room_id}`;
                    const redisPriceData = await getRedis(priceKey);

                    if (redisPriceData === null) {
                        const sqlPriceData = await searchService.getPriceByRoomId(data[i].room_id);

                        setRedis(priceKey, sqlPriceData);

                        const filteredPriceData = sqlPriceData.filter((price) => {
                            return dayjs(price.date).isAfter(startDate) && dayjs(price.date).isBefore(endDate);
                        });

                        data[i].room_price = filteredPriceData;
                    } else {
                        const filteredPriceData = JSON.parse(redisPriceData).filter((price: RoomPriceRows) => {
                            return dayjs(price.date).isAfter(startDate) && dayjs(price.date).isBefore(endDate);
                        });

                        data[i].room_price = filteredPriceData;
                    }
                }

                res.status(200).json({
                    error: null,
                    data: data,
                });
            }
        } catch (error) {
            let data = await searchService.getSearch({ searchValue, personNum });
            const key: string = `/search/${searchValue}/${personNum}`;

            setRedis1H(key, data);
            

            for (let i = 0; i < data.length; i++) {
                const sqlPriceData = await searchService.getPriceByRoomId(data[i].room_id);

                const filteredPriceData = sqlPriceData.filter((price) => {
                    return dayjs(price.date).isAfter(dayjs(startDate).subtract(1, 'day')) && dayjs(price.date).isBefore(endDate, 'day');
                });

                data[i].room_price = filteredPriceData;
            }

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },
};
