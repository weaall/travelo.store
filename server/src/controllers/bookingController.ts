import { Response, Request } from "express"
import { JWTCheck, RoomPriceRows } from "../interface/interfaces"
import bookingService from "../services/bookingService";
import roomService from "../services/roomService";
import { getRedis, setRedis } from "../utils/redisUtils";
import dayjs from "dayjs";
import CustomError from "../utils/customError";

const bookingController = {
    async addBookingRef(req: JWTCheck, res: Response) {
        const roomId: string = req.body.room_id;
        const totalPrice: number = req.body.total_price;
        const checkIn = dayjs(req.body.check_in as string).format("YYYY-MM-DD");
        const checkOut = dayjs(req.body.check_out as string).format("YYYY-MM-DD");

        const filterByDate = (priceData: RoomPriceRows[]) => {
            const filteredData = priceData.filter((price) => {
                const dateInRange =
                dayjs(price.date).isAfter(dayjs(checkIn).subtract(1, "day")) && dayjs(price.date).isBefore(checkOut, "day");
                const isAvailable = price.room_limit > price.room_current;
                return dateInRange && isAvailable;
            });
        
            const totalFilteredPrice = filteredData.reduce((sum, price) => sum + price.price, 0);
            const isTotalPriceMatch = totalFilteredPrice === totalPrice;
        
            const isAllFilteredDataIncluded = filteredData.every(item => priceData.includes(item));
        
            return isTotalPriceMatch && isAllFilteredDataIncluded;
        };
        try {
            const roomData = await roomService.getPriceByRoomId(roomId);

            if (!filterByDate(roomData)) {
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
    async addBooking(req: JWTCheck, res: Response) {
        try {
            const data = await bookingService.addBooking(req.user.id, req.body);

            res.status(200).json({
                error: null,
                data: data,
            });
        } catch (error) {
            throw error;
        }
    },
};

export default bookingController