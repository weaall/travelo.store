import { body, query, param } from "express-validator";

export const SearchValidator = {
    getSearch: [
        query("searchValue").notEmpty().trim(),
        query("checkInDate").notEmpty().trim(),
        query("checkOutDate").notEmpty().trim(),
        query("adult").notEmpty().trim(),
        query("child").notEmpty().trim(),
    ]
}