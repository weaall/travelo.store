import { FieldPacket, ResultSetHeader } from "mysql2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../config/db";
import CustomError from "../utils/customError";
import { SignUpParams, SignInParams, userRowsProps } from "../interface/interfaces";

const JWT_SECRET = process.env.JWT_SECRET || "";
const BCRYPT_SALT = process.env.BCRYPT_SALT || "";

const userService = {
    async me(id : string) {

        const checkIdSql = "SELECT * FROM user WHERE id = ?";
        const checkIdParams = [id];
        try {
            const [rows, fields]: [userRowsProps[], FieldPacket[]] = await pool.execute(checkIdSql, checkIdParams);

            if (rows.length > 0) {
                throw new CustomError("이미 존재하는 이메일입니다.", 409);
            }

            return;
        } catch (error) {
            throw error;
        }
    },
};

export default userService;
