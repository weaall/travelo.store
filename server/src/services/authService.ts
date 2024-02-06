import pool from "../config/db";
import CustomError from "../utils/customError";

import jwt from "jsonwebtoken";
import { userDataProps } from "../interface/interfaces";

const JWT_SECRET = process.env.JWT_SECRET || "";

const authService = {
    async kakaoSignIn(id: string) {
        if (!id) {
            throw new CustomError("POST data is missing or empty.", 400);
        }

        const selectSql = "SELECT * FROM user WHERE social = 'kakao' AND social_id = ?";
        const selectParams = [id];
        const insertSql = "INSERT INTO user (social, social_id) VALUES (? , ?)";
        const insertParams = ["kakao", id];

        try {
            const [rows] = await pool.execute(selectSql, selectParams);

            if (JSON.stringify(rows) !== JSON.stringify([])) {
                const userData: userDataProps = JSON.parse(JSON.stringify(rows));
                const token = jwt.sign({ id: userData.id, ad: userData.admin }, JWT_SECRET, {
                    expiresIn: "1d",
                });

                return token;
            } else {
                const [insertRows] = await pool.execute(insertSql, insertParams);

                if (insertRows && "insertId" in insertRows) {
                    const newUserId = insertRows.insertId;
                    const token = jwt.sign({ id: newUserId, ad: 0 }, JWT_SECRET, {
                        expiresIn: "1d",
                    });

                    return token;
                } else {
                    throw new CustomError("Internal Server Error", 500);
                }
            }
        } catch (err) {
            throw new CustomError("Internal Server Error", 500);
        }
    },
};

export default authService;
