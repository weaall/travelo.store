import { FieldPacket, ResultSetHeader } from "mysql2"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import pool from "../config/db"
import CustomError from "../utils/customError"
import { SignUpParams, SignInParams, userRowsProps } from "../interface/interfaces"
require('dotenv').config();

interface NaverAuthProps{
    id:string,
    mobile:string,
    name:string,
    email:string
}

const JWT_SECRET = process.env.JWT_SECRET || ""
const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT  || "", 10);

const authService = {
    async singUp({ email, password, name, phone_num }: SignUpParams) {
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);
        const checkIdSql = "SELECT * FROM user WHERE email = ?";
        const checkIdParams = [email];
        const singUpSql = "INSERT INTO user (email, password, name, phone_num) VALUES (? , ? , ? , ?)";
        const singUpParams = [email, hashedPassword, name, phone_num];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [userRowsProps[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams);

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
        const checkIdSql = "SELECT * FROM user WHERE email = ?";
        const checkIdParams = [email];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [userRowsProps[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams);

            if (rows.length === 0) {
                throw new CustomError("이메일과 비밀번호가 일치하지 않습니다", 401);
            }

            const isPasswordValid = await bcrypt.compare(password, rows[0].password);
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

    async kakaoSignIn(id: string) {
        const selectSql = "SELECT * FROM user WHERE social = 'kakao' AND social_id = ?";
        const selectParams = [id];
        const insertSql = "INSERT INTO user (social, social_id) VALUES (? , ?)";
        const insertParams = ["kakao", id];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [userRowsProps[], FieldPacket[]] = await connection.execute(selectSql, selectParams);

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
            const [rows, fields]: [userRowsProps[], FieldPacket[]] = await connection.execute(selectSql, selectParams);

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
