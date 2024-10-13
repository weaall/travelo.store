import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import pool from "../config/db"
import CustomError from "../utils/customError"
require('dotenv').config();

export interface UserRows extends RowDataPacket {
    id: number;
    email: string;
    password: string;
    name: string;
    phone_num: string;
    social: string;
    social_id: string;
    admin: number;
}

interface SignUpParams {
    email: string;
    password: string;
    name: string;
    mobile: string;
}

interface SignInParams {
    email: string;
    password: string;
}

interface NaverAuthProps{
    id:string,
    mobile:string,
    name:string,
    email:string
}

const JWT_SECRET = process.env.JWT_SECRET || ""
const PASS_SECRET = process.env.PASS_SECRET_KEY || ""
const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT  || "", 10);

const authService = {
    async singUp({ email, password, name, mobile }: SignUpParams) {
        const decryptedBytes = CryptoJS.AES.decrypt(password, PASS_SECRET);
        const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
        const hashedPassword = await bcrypt.hash(decryptedPassword, BCRYPT_SALT);
        const checkIdSql = "SELECT * FROM user WHERE email = ?";
        const checkIdParams = [email];
        const singUpSql = "INSERT INTO user (email, password, name, mobile) VALUES (? , ? , ? , ?)";
        const singUpParams = [email, hashedPassword, name, mobile];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [UserRows[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams);

            if (rows.length > 0) {
                throw new CustomError("이미 존재하는 이메일입니다.", 409);
            }

            const [result] = await connection.execute(singUpSql, singUpParams);

            return;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async singIn({ email, password }: SignInParams) {
        const decryptedBytes = CryptoJS.AES.decrypt(password, PASS_SECRET);
        const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

        const checkIdSql = "SELECT * FROM user WHERE email = ?";
        const checkIdParams = [email];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [UserRows[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams);

            if (rows.length === 0) {
                throw new CustomError("이메일과 비밀번호가 일치하지 않습니다", 401);
            }

            const isPasswordValid = await bcrypt.compare(decryptedPassword, rows[0].password);
            if (!isPasswordValid) {
                throw new CustomError("이메일과 비밀번호가 일치하지 않습니다", 401);
            }

            const token = jwt.sign({ id: rows[0].id, ad: rows[0].admin }, JWT_SECRET, {
                expiresIn: "1d",
            });

            return token;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async signInByKakao(id: string) {
        const selectSql = "SELECT * FROM user WHERE social = 'kakao' AND social_id = ?";
        const selectParams = [id];
        const insertSql = "INSERT INTO user (social, social_id) VALUES (? , ?)";
        const insertParams = ["kakao", id];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [UserRows[], FieldPacket[]] = await connection.execute(selectSql, selectParams);

            if (rows.length > 0) {
                const token = jwt.sign({ id: rows[0].id, ad: rows[0].admin }, JWT_SECRET, {
                    expiresIn: "1d",
                });

                return token;
            } else {
                const [result, fields]: [ResultSetHeader, FieldPacket[]] = await connection.execute(insertSql, insertParams);
                const token = jwt.sign({ id: result.insertId, ad: 0 }, JWT_SECRET, {
                    expiresIn: "1d",
                });

                return token;
            }
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async signInByNaver({ id, email, mobile, name }: NaverAuthProps) {
        const selectSql = "SELECT * FROM user WHERE social = 'naver' AND social_id = ?";
        const selectParams = [id];
        const insertSql = "INSERT INTO user (social, social_id, email, name, phone_num) VALUES (?, ?, ?, ?, ?)";
        const insertParams = ["naver", id, email, name, mobile];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [UserRows[], FieldPacket[]] = await connection.execute(selectSql, selectParams);

            if (rows.length > 0) {
                const token = jwt.sign({ id: rows[0].id, ad: rows[0].admin }, JWT_SECRET, {
                    expiresIn: "1d",
                });

                return token;
            } else {
                const [result, fields]: [ResultSetHeader, FieldPacket[]] = await connection.execute(insertSql, insertParams);
                const token = jwt.sign({ id: result.insertId, ad: 0 }, JWT_SECRET, {
                    expiresIn: "1d",
                });

                return token;
            }
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
};

export default authService
