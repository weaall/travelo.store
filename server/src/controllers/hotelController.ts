import { Response, Request } from "express"
import { JWTCheck } from "../interface/interfaces"
import hotelService from "../services/hotelService"
import { getRedis, setRedis1D } from "../utils/redisUtils";

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
            const data = await hotelService.getHotelById(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getHotelRatingByHotelId(req: Request, res: Response) {
        try {
            const key: string = `/hotel/rating/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await hotelService.getHotelRatingByHotelId(req.params.id);

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
            const data = await hotelService.getHotelRatingByHotelId(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async regHotel(req: JWTCheck, res: Response) {
        const data = await hotelService.regHotel(req.user.id, req.body);

        const key: string = `/myhotel/${req.user.id}`;
        const hotelList = await hotelService.getMyHotel(req.user.id);
        setRedis1D(key, hotelList);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async getMyHotel(req: JWTCheck, res: Response) {
        try {
            const key: string = `/myhotel/${req.user.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await hotelService.getMyHotel(req.user.id);

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
            const data = await hotelService.getMyHotel(req.user.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getHotelInfoById(req: JWTCheck, res: Response) {
        try {
            const key: string = `/myhotel/info/${req.user.id}/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await hotelService.getHotelInfoById(req.user.id, req.params.id);

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
            const data = await hotelService.getHotelInfoById(req.user.id, req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getHotelImgUrl(req: Request, res: Response) {
        try {
            const key: string = `/hotel/img/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await hotelService.getHotelImgUrl(req.params.id);

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
            const data = await hotelService.getHotelImgUrl(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async putHotelInfo(req: JWTCheck, res: Response) {
        const data = await hotelService.putHotelInfo(req.user.id, req.body);

        const myHotelKey: string = `/myhotel/${req.user.id}`;
        const myHotel = await hotelService.getMyHotel(req.user.id);
        setRedis1D(myHotelKey, myHotel);

        const myHotelInfoKey: string = `/myhotel/info/${req.user.id}/${req.body.hotel_id}`;
        const myHotelInfo = await hotelService.getHotelInfoById(req.user.id, req.body.hotel_id);
        setRedis1D(myHotelInfoKey, myHotelInfo);

        const imgUrlKey: string = `/hotel/img/${req.body.hotel_id}`;
        const imgUrl = await hotelService.getHotelImgUrl(req.body.hotel_id);
        setRedis1D(imgUrlKey, imgUrl);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async putHotelServ(req: JWTCheck, res: Response) {
        const data = await hotelService.putHotelServ(req.user.id, req.body);

        const hotelKey: string = `/hotel/${req.body.hotel_id}`;
        const hotel = await hotelService.getHotelById(req.body.hotel_id);
        setRedis1D(hotelKey, hotel);

        const myHotelInfoKey: string = `/myhotel/info/${req.user.id}/${req.body.hotel_id}`;
        const myHotelInfo = await hotelService.getHotelInfoById(req.user.id, req.body.hotel_id);
        setRedis1D(myHotelInfoKey, myHotelInfo);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async putHotelFacil(req: JWTCheck, res: Response) {
        const data = await hotelService.putHotelFacil(req.user.id, req.body);

        const hotelKey: string = `/hotel/${req.body.hotel_id}`;
        const hotel = await hotelService.getHotelById(req.body.hotel_id);
        setRedis1D(hotelKey, hotel);

        const myHotelInfoKey: string = `/myhotel/info/${req.user.id}/${req.body.hotel_id}`;
        const myHotelInfo = await hotelService.getHotelInfoById(req.user.id, req.body.hotel_id);
        setRedis1D(myHotelInfoKey, myHotelInfo);

        res.status(201).json({
            error: null,
            data: data,
        });
    },
};

export default hotelController
