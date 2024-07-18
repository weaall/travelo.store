import { body, query, param } from "express-validator";


export const bookingValidator = {
    addBookingRef: [
        body("booking_id").notEmpty().trim(),
        body("room_id").notEmpty().trim(),
        body("total_price").notEmpty().trim(),
        body("check_in").notEmpty().trim(),
        body("check_out").notEmpty().trim(),
    ],

    deleteBookingRef: [param("id").notEmpty().trim()],

    getBookingById : [
        param("id").notEmpty().trim(),
    ],

    confirmBooking: [
        query("hotelName").notEmpty(),

        query("hotel_id").notEmpty().trim(),

        query("name").notEmpty().matches(/^[가-힣a-zA-Z\s]+$/)
        .isLength({ min: 2, max: 20 }),

        query("email").notEmpty().trim().isEmail(),

        query("mobile")
        .notEmpty().trim()
        .matches(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)
        .isLength({ min: 13, max: 13 }),

        query("paymentType").notEmpty().trim(),

        query("orderId").notEmpty().trim(),

        query("paymentKey").notEmpty().trim(),

        query("amount").notEmpty().trim(),

    ],
};