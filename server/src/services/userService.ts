import { FieldPacket } from "mysql2";
import pool from "../config/db";
import CustomError from "../utils/customError";
import { userRowsProps } from "../interface/interfaces";

const userService = {
    async me(id: string) {
        const checkIdSql = "SELECT * FROM user WHERE id = ?";
        const checkIdParams = [id];
        try {
            const [rows, fields]: [userRowsProps[], FieldPacket[]] = await pool.execute(checkIdSql, checkIdParams);

            if (rows.length === 0) {
                throw new CustomError("해당유저가 존재하지 않습니다.", 404);
            }

            return rows;
        } catch (error) {
            throw error;
        }
    },
};

export default userService;
