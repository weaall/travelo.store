import pool from "../config/db";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError";

import jwt from "jsonwebtoken";
import { SignUpParams, userDataProps } from "../interface/interfaces";

const JWT_SECRET = process.env.JWT_SECRET || "";

const authService = {
    async singUp({ email, password, name, phone_num }: SignUpParams) {

        
        const hashedPassword = await bcrypt .hash(password, 12);
        const checkIdSql = "SELECT * FROM user WHERE email = ?";
        const checkIdParams = [email];
        const singUpSql = "INSERT INTO user (email, password, name, phone_num) VALUES (? , ? , ? , ?)";
        const singUpParams = [email, hashedPassword, name, phone_num];
        try {
            const [rows] = await pool.execute(checkIdSql, checkIdParams);

            if (JSON.stringify(rows) !== JSON.stringify([])) {
                throw new CustomError("이미 존재하는 이메일입니다.", 409);
            }

            const [result] = await pool.execute(singUpSql, singUpParams);

            return result;
        } catch (error) {
            throw error;
        }
    },

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
        } catch (error) {
            throw error
        }
    },
};

export default authService;
