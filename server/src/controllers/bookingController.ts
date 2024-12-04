import { Response, Request } from "express";
import { JWTCheck, RoomPriceRows } from "../interface/interfaces";
import bookingService from "../services/bookingService";
import roomService from "../services/roomService";
import { getRedis, msetRedis1D, setRedis1D } from "../utils/redisUtils";
import dayjs from "dayjs";
import CustomError from "../utils/customError";
import msgService from "../services/msgService";
const got = require("got");

const filterByDate = (priceData: RoomPriceRows[], checkIn: string, checkOut: string, totalPrice: number) => {
    const filteredData = priceData.filter((price) => {
        const dateInRange = dayjs(price.date).isAfter(dayjs(checkIn).subtract(1, "day")) && dayjs(price.date).isBefore(checkOut, "day");
        const isAvailable = price.room_limit > price.room_current;
        return dateInRange && isAvailable;
    });

    const totalFilteredPrice = filteredData.reduce((sum, price) => sum + price.price, 0);
    const isTotalPriceMatch = totalFilteredPrice === totalPrice;

    const isAllFilteredDataIncluded = filteredData.every((item) => priceData.includes(item));

    return isTotalPriceMatch && isAllFilteredDataIncluded;
};

const bookingController = {
    async addBookingRef(req: JWTCheck, res: Response) {
        const roomId: string = req.body.room_id;
        const totalPrice: number = req.body.total_price;
        const checkIn = dayjs(req.body.check_in as string).format("YYYY-MM-DD");
        const checkOut = dayjs(req.body.check_out as string).format("YYYY-MM-DD");
        try {
            const roomData = await roomService.getPriceByRoomId(roomId);

            if (!filterByDate(roomData, checkIn, checkOut, totalPrice)) {
                throw new CustomError("NOT AVAILABLE", 400);
            }

            const data = await bookingService.addBookingRef(req.user.id, req.body);

            res.status(200).json({
                error: null,
                data: data,
            });
        } catch (error) {
            throw error;
        }
    },

    async deleteBookingRef(req: Request, res: Response) {
        try {
            const data = await bookingService.deleteBookingRef(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        } catch (error) {
            throw error;
        }
    },

    async getBookingById(req: JWTCheck, res: Response) {
        try {
            const key: string = `/booking/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await bookingService.getBookingById(req.user.id, req.params.id);

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
            const data = await bookingService.getBookingById(req.user.id, req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getBookingByUserId(req: JWTCheck, res: Response) {
        try {
            const key: string = `/booking/user/${req.user.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await bookingService.getBookingByUserId(req.user.id);

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
            const data = await bookingService.getBookingByUserId(req.user.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async confirmBooking(req: Request, res: Response) {
        const { hotelName, hotel_id, name, email, mobile, paymentType, orderId, paymentKey, amount } = req.query;

        const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
        const encryptedSecretKey = "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

        try {
            const bookingRefData = await bookingService.getBookingRef(orderId as string);

            const parsedAmount = Number(amount);
            const parsedOrderId = orderId as string;

            if (bookingRefData[0].total_price === parsedAmount && bookingRefData[0].booking_id === parsedOrderId) {
                try {
                    const response = await got.post("https://api.tosspayments.com/v1/payments/confirm", {
                        headers: {
                            Authorization: encryptedSecretKey,
                            "Content-Type": "application/json",
                        },
                        json: {
                            orderId: orderId,
                            amount: amount,
                            paymentKey: paymentKey,
                        },
                        responseType: "json",
                    });

                    await bookingService.addBooking(bookingRefData[0].user_id, {
                        booking_id: parsedOrderId,
                        hotel_id: hotel_id as string,
                        room_id: bookingRefData[0].room_id,
                        total_price: parsedAmount,
                        check_in: bookingRefData[0].check_in,
                        check_out: bookingRefData[0].check_out,
                        name: name as string,
                        mobile: mobile as string,
                        email: email as string,
                    });

                    const successMsg = `예약이 성공적으로 완료되었습니다.
                            예약 번호: ${orderId}
                            이름 : ${hotelName}
                            체크인 날짜: ${bookingRefData[0].check_in}
                            체크아웃 날짜: ${bookingRefData[0].check_out}
                            총 결제 금액: ${parsedAmount.toLocaleString()}원
                            예약자 이름: ${name}
                            예약자 연락처: ${mobile}
                            예약자 이메일: ${email}`;

                    await msgService.sendBookingMsgFromHotel(bookingRefData[0].user_id, hotel_id as string, successMsg);

                    const timeStamp = dayjs().toISOString();
                    const userId = bookingRefData[0].user_id;
                    const hotelId = hotel_id as string;
                    const roomId = bookingRefData[0].room_id;

                    const pairs = [
                        { key: `/timeStamp/msg/list/user/${userId}`, data: timeStamp },
                        { key: `/timeStamp/msg/list/hotel/${hotelId}`, data: timeStamp },
                        { key: `/timeStamp/msg/chat/${userId}/${hotelId}`, data: timeStamp },
                        { key: `/booking/user/${userId}`, data: await bookingService.getBookingByUserId(userId) },
                        { key: `/timeStamp/room/price/roomId/${roomId}`, data: timeStamp },
                        { key: `/timeStamp/booking/hotel/${hotelId}`, data: timeStamp },
                    ];

                    msetRedis1D(pairs);

                    res.redirect(`https://travelo.store/success/${orderId}`);
                } catch (paymentError) {
                    await bookingService.rollbackBookingRef(bookingRefData[0].user_id, parsedOrderId);
                    throw paymentError;
                }
            } else {
                throw new CustomError("UNAUTHORIZED", 401);
            }
        } catch (error) {
            console.log(error)
            res.redirect("https://travelo.store/fail");
        }
    },

    async regReview(req: JWTCheck, res: Response) {
        const data = await bookingService.regReview(req.user.id, req.body);

        setRedis1D(`/review/user/${req.user.id}`, await bookingService.getReviewByUserId(req.user.id));
        setRedis1D(`/review/hotel/${req.body.hotel_id}`, await bookingService.getReviewByHotelId(req.body.hotel_id));

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async getReviewByUserId(req: JWTCheck, res: Response) {
        try {
            const key: string = `/review/user/${req.user.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await bookingService.getReviewByUserId(req.user.id);

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
            const data = await bookingService.getReviewByUserId(req.user.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getReviewByHotelId(req: Request, res: Response) {
        try {
            const key: string = `/review/hotel/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await bookingService.getReviewByHotelId(req.params.id);

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
            const data = await bookingService.getReviewByHotelId(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getReviewByBookingId(req: Request, res: Response) {
        try {
            const key: string = `/review/booking/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (redisData === null) {
                const data = await bookingService.getReviewByBookingId(req.params.id);

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
            const data = await bookingService.getReviewByBookingId(req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async getBookingByHotelId(req: JWTCheck, res: Response) {
        try {
            const timeStamp = dayjs().toISOString();
            const timeStampKey: string = `/timeStamp/booking/hotel/${req.params.id}`;
            const timeStampRedis = JSON.parse(await getRedis(timeStampKey));

            const key: string = `/booking/hotel/${req.params.id}`;
            const redisData = JSON.parse(await getRedis(key));

            if (timeStampRedis === null) {
                setRedis1D(timeStampKey, timeStamp);
            }

            if (redisData === null || !dayjs(redisData.timeStamp).isSame(timeStampRedis)) {
                const data = await bookingService.getBookingByHotelId(req.user.id, req.params.id);

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
            const data = await bookingService.getBookingByHotelId(req.user.id, req.params.id);

            res.status(200).json({
                error: null,
                data: data,
            });
        }
    },

    async updateBookingStatus(req: JWTCheck, res: Response) {
        const data = await bookingService.updateBookingStatus(req.user.id, req.body);

        const timeStamp = dayjs().toISOString();
         const timeStampKey: string = `/timeStamp/booking/hotel/${req.body.hotel_id}`;
        setRedis1D(timeStampKey, timeStamp);

        res.status(201).json({
            error: null,
            data: data,
        });
    },
};

export default bookingController;
