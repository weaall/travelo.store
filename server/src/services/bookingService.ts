import { FieldPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"

const bookingService = {
    async addBookingRef(){
        const connection = await pool.getConnection();

        const addBookingRefSql =
            `INSERT INTO booking_ref (booking_id, user_id, room_id, total_price, check_in, check_out) VALUES (?, ?, ?, ?, ?, ?)`;

        try {
            const [rows, fields]: [ResultSetHeader[], FieldPacket[]] = await connection.execute(
                addBookingRefSql,
            );

            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}

export default bookingService