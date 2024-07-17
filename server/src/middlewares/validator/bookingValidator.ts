import { body } from "express-validator";


export const bookingValidator = {
    addBookingRef: [
        body("booking_id")
            .notEmpty()
            .trim(),
            body("room_id")
            .notEmpty()
            .trim(),
            body("total_price")
            .notEmpty()
            .trim(),
            body("check_in")
            .notEmpty()
            .trim(),
            body("check_out")
            .notEmpty()
            .trim(),
    ]
}