import { body, query, param } from "express-validator";

export const msgValidator = {
    sendMsg: [
        body("hotel_id").notEmpty().trim(),
        body("text").notEmpty().trim(),
    ],
    sendMsgFromHotel: [
        body("hotel_id").notEmpty().trim(),
        body("user_id").notEmpty().trim(),
        body("text").notEmpty().trim(),
    ],
    getMsgByBothId: [
        param("id").notEmpty().trim(),
    ],
    getMsgByHotelId: [
        param("id").notEmpty().trim(),
    ],
    getMsgFromHotel: [
        param("hotel_id").notEmpty().trim(),
        param("user_id").notEmpty().trim(),
    ],
}