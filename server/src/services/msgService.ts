import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";
import CustomError from "../utils/customError";

interface AddMsgProps {
    hotel_id: string;
    text: string;
}

interface AddMsgByHotelId {
    hotel_id: string;
    text: string;
    user_id: string;
}

interface GetMsgFromHotel {
    hotel_id: string;
    user_id: string;
}

const msgService = {
    async sendMsg(user_id: string, { hotel_id, text }: AddMsgProps) {
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

    async getMsgByHotelId(user_id: string, hotel_id: string) {
        const checkAuthSql = "SELECT * FROM hotel WHERE id = ? and user_id = ?";
        const checkAuthParams = [hotel_id, user_id];
        
        const getMsg = `
            SELECT m.text, m.created_at, m.checked, m.by_user, m.user_id, m.hotel_id
            FROM message m
                JOIN (
                    SELECT user_id, MAX(created_at) AS latest_created_at
                    FROM message
                    WHERE hotel_id = ?
                    GROUP BY user_id
            ) AS latest_messages
            ON m.user_id = latest_messages.user_id AND m.created_at = latest_messages.latest_created_at
            WHERE m.hotel_id = ?
            ORDER BY m.created_at DESC;`;
        const getMsgValues = [hotel_id, hotel_id];

        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [ResultSetHeader[], FieldPacket[]] = await connection.execute(checkAuthSql, checkAuthParams);

            if (rows.length === 0) {
                throw new CustomError("UNAUTHORIZED", 401);
            }

            const [getMsgResult]: [RowDataPacket[], FieldPacket[]] = await connection.execute(getMsg, getMsgValues);

            return getMsgResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async getMsgByBothId(user_id: string, hotel_id: string) {
        const getMsg = `
            SELECT text, created_at, checked, by_user
            FROM message 
            WHERE user_id = ? AND hotel_id = ?
            ORDER BY created_at ASC;`;
        const getMsgValues = [user_id, hotel_id];

        const updateChecked = `
            UPDATE message
            SET checked = 1
            WHERE user_id = ? AND hotel_id = ? AND checked = 0;`;
        const updateCheckedValues = [user_id, hotel_id];


        const connection = await pool.getConnection();

        try {
            const [getMsgResult]: [RowDataPacket[], FieldPacket[]] = await connection.execute(getMsg, getMsgValues);

            await connection.execute(updateChecked, updateCheckedValues);
            
            return getMsgResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async updateChecked(user_id: string, hotel_id: string) {
        const updateChecked = `
            UPDATE message
            SET checked = 1
            WHERE user_id = ? AND hotel_id = ? AND checked = 0;`;
        const updateCheckedValues = [user_id, hotel_id];
    
        const connection = await pool.getConnection();
    
        try {
            await connection.execute(updateChecked, updateCheckedValues);
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async getMsgFromHotel(jwt_id: string, hotel_id: string, user_id:string) {
        const checkAuthSql = "SELECT * FROM hotel WHERE id = ? and user_id = ?";
        const checkAuthParams = [hotel_id, user_id];

        const getMsg = `
            SELECT text, created_at, checked, by_user, user_id
            FROM message 
            WHERE user_id = ? AND hotel_id = ?
            ORDER BY created_at ASC;`;
        const getMsgValues = [user_id, hotel_id];

        const updateChecked = `
            UPDATE message
            SET checked = 1
            WHERE user_id = ? AND hotel_id = ? AND checked = 0 AND by_user = 1`;
        const updateCheckedValues = [user_id, hotel_id];


        const connection = await pool.getConnection();

        try {
            const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
                checkAuthSql,
                checkAuthParams,
            );

            if (rows.length === 0) {
                throw new CustomError("UNAUTHORIZED", 401);
            }

            const [getMsgResult]: [RowDataPacket[], FieldPacket[]] = await connection.execute(getMsg, getMsgValues);

            await connection.execute(updateChecked, updateCheckedValues);
            
            return getMsgResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async sendBookingMsgFromHotel(user_id: string, hotel_id: string, text: string) {
        const addMsg = "INSERT INTO message (user_id, hotel_id, text, checked, by_user) VALUES (?, ?, ?, ?, ?)";
        const addMsgValues = [user_id, hotel_id, text, 0, 0];

        const connection = await pool.getConnection();

        try {
            const [addMsgResult, field]: [ResultSetHeader[], FieldPacket[]] = await connection.execute(addMsg, addMsgValues);

            return addMsgResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async sendMsgFromHotel(id: string, {user_id, hotel_id, text}:AddMsgByHotelId) {
        const checkAuthSql = "SELECT * FROM hotel WHERE id = ? and user_id = ?";
        const checkAuthParams = [hotel_id, id];

        const addMsg = "INSERT INTO message (user_id, hotel_id, text, by_user) VALUES (?, ?, ?, ?, ?)";
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
