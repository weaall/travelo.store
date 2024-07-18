import { body, query, param } from "express-validator";

export const hotelValidator = {
    getHotelById: [param("id").notEmpty().trim()],

    regHotel: [
        body("name")
            .notEmpty()
            .trim()
            .matches(/^[가-힣a-zA-Z\s]+$/)
            .isLength({ min: 2, max: 20 }),
        body("postcode").notEmpty().trim(),
        body("address").notEmpty().trim(),
        body("address_detail").trim(),
        body("reg_num").notEmpty().trim(),
        body("bank").notEmpty().trim(),
        body("account").notEmpty().trim(),
        body("owner")
            .notEmpty()
            .trim()
            .matches(/^[가-힣a-zA-Z\s]+$/)
            .isLength({ min: 2, max: 20 }),
        body("urls").notEmpty().trim(),
    ],

    getMyHotel: [
        
    ]
};
