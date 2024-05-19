import { Response, Request } from "express";
import searchService from "../services/searchService";
import { getRedis, setRedis, setRedis1H } from "../utils/redisUtils";
import dayjs from "dayjs";
import { RoomPriceRows } from "../interface/interfaces";
import { getSearchRows, priceFilter } from "../interface/mysql.interface";

export const searchController = {
    async getSearch(req: Request, res: Response) {
        const searchValue = decodeURIComponent(req.query.searchValue as string);
        const startDate = dayjs(req.query.startDate as string).format("YYYY-MM-DD");
        const endDate = dayjs(req.query.endDate as string).format("YYYY-MM-DD");
        const personNum = parseInt(req.query.adult as string) + parseInt(req.query.child as string);

        const filterByHotelId = (data: getSearchRows[]) => {
            const filterdData = data.filter((item) => item.room_price.length === dayjs(endDate).diff(dayjs(startDate), "day"));

            const filteredHotel: { [key: string]: getSearchRows } = {};

            for (const item of filterdData) {
                const hotelId = item.hotel_id;
                const sumPrice = item.room_price.reduce((sum, price) => sum + price.price, 0);

                if (!filteredHotel[hotelId] || filteredHotel[hotelId].room_price.reduce((sum, price) => sum + price.price, 0) > sumPrice) {
                    filteredHotel[hotelId] = { ...item, room_price_sum: sumPrice };
                }
            }

            const resultData = Object.values(filteredHotel).map((item) => {
                delete item.room_price_sum;
                return item;
            });

            return resultData;
        };

        const filterByDate = (priceData: RoomPriceRows[]) => {
            return priceData.filter((price) => {
                return (
                    dayjs(price.date).isAfter(dayjs(startDate).subtract(1, "day")) && dayjs(price.date).isBefore(endDate, "day")
                );
            });
        };

        const addImageData = async (data: getSearchRows[]) => {
            for (const hotel of data) {
                const hotelImages = await searchService.getHotelImgUrl(hotel.hotel_id);
                hotel.hotel_img = hotelImages;
            }
            return data;
        };

        const addImageDataRedis = async (data: getSearchRows[]) => {
            for (const hotel of data) {
                const imgKey = `/hotel/img/${hotel.hotel_id}`
                const redisImages = JSON.parse(await getRedis(imgKey));

                if (redisImages === null){
                    const hotelImages = await searchService.getHotelImgUrl(hotel.hotel_id);
                    setRedis(imgKey, hotelImages);
                    hotel.hotel_img = hotelImages;

                }else{
                    hotel.hotel_img = redisImages;
                }
            }
            return data;
        };

        try {
            const key: string = `/search/${searchValue}/${personNum}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                let data = await searchService.getSearch({ searchValue, personNum });

                setRedis1H(key, data);

                for (let i = 0; i < data.length; i++) {
                    const priceKey: string = `/room/price/${data[i].room_id}`;
                    const redisPriceData = JSON.parse(await getRedis(priceKey));

                    if (redisPriceData === null) {
                        const sqlPriceData = await searchService.getPriceByRoomId(data[i].room_id);

                        setRedis(priceKey, sqlPriceData);

                        data[i].room_price = filterByDate(sqlPriceData);
                    } else {
                        data[i].room_price = filterByDate(redisPriceData);

                    }
                }
                let resultData = filterByHotelId(data);

                resultData = await addImageDataRedis(resultData);

                res.status(200).json({
                    error: null,
                    data: resultData,
                });
            } else {
                let data = redisData;

                for (let i = 0; i < data.length; i++) {
                    const priceKey: string = `/room/price/${data[i].room_id}`;
                    const redisPriceData = JSON.parse(await getRedis(priceKey));

                    if (redisPriceData === null) {
                        const sqlPriceData = await searchService.getPriceByRoomId(data[i].room_id);

                        setRedis(priceKey, sqlPriceData);

                        data[i].room_price = filterByDate(sqlPriceData);
                    } else {
                        data[i].room_price = filterByDate(redisPriceData);
                    }
                }
                let resultData = filterByHotelId(data);

                resultData = await addImageDataRedis(resultData);

                res.status(200).json({
                    error: null,
                    data: resultData,
                });
            }
        } catch (error) {
            let data = await searchService.getSearch({ searchValue, personNum });

            for (let i = 0; i < data.length; i++) {
                const sqlPriceData = await searchService.getPriceByRoomId(data[i].room_id);

                data[i].room_price = filterByDate(sqlPriceData);
            }

            let resultData = filterByHotelId(data);

            resultData = await addImageData(resultData);

            res.status(200).json({
                error: null,
                data: resultData,
            });
        }
    },
};
