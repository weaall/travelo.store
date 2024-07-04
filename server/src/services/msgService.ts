import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";
import CustomError from "../utils/customError";

interface AddMsgProps {
    hotel_id: string;
    text: string;
}

const msgService = {
    async addMsg(user_id: string, { hotel_id, text }: AddMsgProps) {
        const addMsg = "INSERT INTO message (user_id, hotel_id, text) VALUES (? , ? , ?)";
        const addMsgValues = [user_id, hotel_id, text];

        const connection = await pool.getConnection();

        try {
            const [addMsgResult, field]: [ResultSetHeader, FieldPacket[]] = await connection.execute(addMsg, addMsgValues);

            return addMsgResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async getMsgByUserId(user_id: string) {
        const getMsg = `
            SELECT m.text, m.created_at, m.checked, m.by_user, m.hotel_id
            FROM message m
                JOIN (
                    SELECT hotel_id, MAX(created_at) AS latest_created_at
                    FROM message
                    WHERE user_id = ?
                    GROUP BY hotel_id
            ) AS latest_messages
            ON m.hotel_id = latest_messages.hotel_id AND m.created_at = latest_messages.latest_created_at
            WHERE m.user_id = ?
            ORDER BY m.created_at DESC;`;
        const getMsgValues = [user_id, user_id];

        const connection = await pool.getConnection();

        try {
            const [getMsgResult]: [RowDataPacket[], FieldPacket[]] = await connection.execute(getMsg, getMsgValues);

            return getMsgResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async addMsgFromHotel(user_id: string, hotel_id: string, text: string) {
        const checkAuthSql = "SELECT * FROM hotel WHERE id = ? and user_id = ?";
        const checkAuthParams = [hotel_id, user_id];

        const addMsg = "INSERT INTO message (user_id, hotel_id, text, checked) VALUES (? , ? , ?, ?)";
        const addMsgValues = [user_id, hotel_id, text, 0];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [ResultSetHeader[], FieldPacket[]] = await connection.execute(checkAuthSql, checkAuthParams);

            if (rows.length === 0) {
                throw new CustomError("UNAUTHORIZED", 401);
            }

            const [addMsgResult, field]: [ResultSetHeader[], FieldPacket[]] = await connection.execute(addMsg, addMsgValues);

            return addMsgResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
};

export default msgService;
