import { body, query, param } from "express-validator";

export const hotelValidator = {
    getHotelById: [param("id").notEmpty().trim()],

    getHotelImgUrlById: [param("id").notEmpty().trim()],

    regHotel: [
        body("name")
            .notEmpty()
            .trim()
            .isLength({ min: 2, max: 20 })
            .matches(/^[가-힣a-zA-Z\s]+$/),
        body("postcode").notEmpty().trim(),
        body("address").notEmpty().trim(),
        body("address_detail").trim(),
        body("reg_num")
            .notEmpty()
            .trim()
            .isLength({ min: 12, max: 12 })
            .matches(/^\d{3}-\d{2}-\d{5}$/),
        body("bank").notEmpty().trim(),
        body("account").notEmpty().trim().isLength({ min: 10, max: 14 }),
        body("owner")
            .notEmpty()
            .trim()
            .matches(/^[가-힣a-zA-Z\s]+$/)
            .isLength({ min: 2, max: 20 }),
        body("urls").notEmpty().trim(),
    ],

    getHotelInfoById: [param("id").notEmpty().trim()],

    putHotelInfo: [
        body("hotel_id").notEmpty().trim(),
        body("description").trim().isLength({ max: 300 }),
        body("check_in").notEmpty().trim(),
        body("check_out").notEmpty().trim(),
        body("tel_num").notEmpty().trim(),
        body("urls").notEmpty().trim(),
    ],

    putHotelServ: [
        body("hotel_id").notEmpty().trim(),
        body("wifi").notEmpty().trim().isLength({ max: 1 }),
        body("always_check_in").notEmpty().trim().isLength({ max: 1 }),
        body("breakfast").notEmpty().trim().isLength({ max: 1 }),
        body("breakfast_price").notEmpty().trim().isLength({ min: 0 ,max: 10 }),
        body("barbecue").notEmpty().trim().isLength({ max: 1 }),
    ],

    putHotelFacil: [
        body("hotel_id").notEmpty().trim(),
        body("carpark").notEmpty().trim().isLength({ max: 1 }),
        body("restaurant").notEmpty().trim().isLength({ max: 1 }),
        body("cafe").notEmpty().trim().isLength({ max: 1 }),
        body("swimming_pool").notEmpty().trim().isLength({ max: 1 }),
        body("spa").notEmpty().trim().isLength({ max: 1 }),
        body("fitness").notEmpty().trim().isLength({ max: 1 }),
        body("convenience_store").notEmpty().trim().isLength({ max: 1 }),
    ],
};
