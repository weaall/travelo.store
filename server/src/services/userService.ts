import { FieldPacket } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"
import { userRowsProps } from "../interface/interfaces"

const userService = {
    async me(id: string) {
        const checkIdSql = "SELECT * FROM user WHERE id = ?";
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
};

export default userService
