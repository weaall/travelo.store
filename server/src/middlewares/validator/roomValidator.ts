import { body, query, param } from "express-validator";

export const roomValidator = {
    getRoomByHotel: [
        param("id").notEmpty().trim(),
    ],
    getRoomById: [
        param("id").notEmpty().trim(),
    ],
    getRoomImgUrl: [
        param("id").notEmpty().trim(),
    ],
    regRoom: [
        body("hotel_id").notEmpty().trim(),
        body("name")
            .notEmpty()
            .trim()
            .isLength({ min: 2, max: 20 }),
        body("num").notEmpty().trim(),
        body("bed_type_id").notEmpty().trim(),
        body("view_type_id").notEmpty().trim(),
    ],
    putRoomInfo: [
        body("hotel_id").notEmpty().trim(),
        body("room_id").notEmpty().trim(),
        body("name")
            .notEmpty()
            .trim()
            .isLength({ min: 2, max: 20 }),
        body("num").notEmpty().trim(),
        body("bed_type_id").notEmpty().trim(),
        body("view_type_id").notEmpty().trim(),
        body("urls").notEmpty().trim(),
    ],
    putRoomServ: [
        body("hotel_id").notEmpty().trim(),
        body("room_id").notEmpty().trim(),
        body("no_smoking").notEmpty().trim().isLength({ max: 1 }),
        body("toiletries").notEmpty().trim().isLength({ max: 1 }),
    ],
    insertPriceByDate: [
        body("hotel_id").notEmpty().trim(),
        body("room_id").notEmpty().trim(),
        body("year").notEmpty().trim(),
        body("month").notEmpty().trim(),
        body("date").notEmpty().trim(),
        body("price").notEmpty().trim().isLength({ min: 4 ,max: 9 }),
        body("room_limit").notEmpty().trim().isLength({ max: 3 }),
    ],
    insertPriceByMonth: [
        body("hotel_id").notEmpty().trim(),
        body("room_id").notEmpty().trim(),
        body("year").notEmpty().trim(),
        body("month").notEmpty().trim(),
        body("days").notEmpty().trim(),
        body("friday").notEmpty().trim(),
        body("saturday").notEmpty().trim(),
        body("room_limit").notEmpty().trim(),
    ],
    getPriceByRoomId: [
        param("id").notEmpty().trim(),
        query("checkInDate").trim(),
        query("checkOutDate").trim(),
    ]
}
