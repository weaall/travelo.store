import { FieldPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"
import { userRowsProps } from "../interface/interfaces"

interface putMyInfoProps{
    name: string,
    email: string,
    mobile: string
}

const userService = {
    async me(id: string) {
        const checkIdSql = "SELECT name, email, mobile, social FROM user WHERE id = ?";
        const checkIdParams = [id];
        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [userRowsProps[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams);

            if (rows.length === 0) {
                throw new CustomError("해당유저가 존재하지 않습니다.", 404);
            }

            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async putMyInfo(user_id: string, {name, email, mobile}: putMyInfoProps) {
        const updateMyinfoSql = "UPDATE user SET name = ?, email = ?, mobile = ? WHERE id = ?";
        const updateMyinfoSqlValues = [name, email, mobile, user_id];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [ResultSetHeader[], FieldPacket[]] = await connection.execute(updateMyinfoSql, updateMyinfoSqlValues);

            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async getNameByUserId(user_id: string) {
        const checkIdSql = "SELECT name FROM user WHERE id = ?";
        const checkIdParams = [user_id];
        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [userRowsProps[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams);

            if (rows.length === 0) {
                throw new CustomError("해당유저가 존재하지 않습니다.", 404);
            }

            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async checkEmail(email: string) {
        const checkIdSql = "SELECT email FROM user WHERE email = ?";
        const checkIdParams = [email];
        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [ResultSetHeader[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams);

            return rows.length;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
};

export default userService
