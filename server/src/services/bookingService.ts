import { FieldPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"
import { BookingProps, BookingRefProps } from "../interface/interfaces";
import dayjs from "dayjs";

const bookingService = {
    async addBookingRef(user_id: string, { booking_id, room_id, total_price, check_in, check_out }: BookingRefProps) {
        const connection = await pool.getConnection();

        const addBookingRefSql = `INSERT INTO booking_ref (booking_id, user_id, room_id, total_price, check_in, check_out) VALUES (?, ?, ?, ?, ?, ?)`;
        const addBookingRefValue = [booking_id, user_id, room_id, total_price, check_in, check_out];

        try {
            await connection.beginTransaction();

            const [addBookingRefResult, field]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
                addBookingRefSql,
                addBookingRefValue,
            );

            let currentDate = dayjs(check_in);
            const endDate = dayjs(check_out);

            while (currentDate.isBefore(endDate)) {
                const addRoomCurrentSql = `UPDATE room_date SET room_current = room_current + 1 WHERE room_id = ? AND date = ?`;
                const addRoomCurrentValue = [room_id, currentDate.format("YYYY-MM-DD")];
                await connection.execute(addRoomCurrentSql, addRoomCurrentValue);
                currentDate = currentDate.add(1, "day");
            }

            await connection.commit();

            return addBookingRefResult;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    async restoreBookingRef(user_id: string, { booking_id, room_id, check_in, check_out }: BookingRefProps) {
        const connection = await pool.getConnection();

        const removeBookingRefSql = `DELETE FROM booking_ref WHERE booking_id = ? AND user_id = ?`;
        const removeBookingRefValue = [booking_id, user_id];

        try {
            await connection.beginTransaction();

            const [removeBookingRefResult, field]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
                removeBookingRefSql,
                removeBookingRefValue,
            );

            let currentDate = dayjs(check_in);
            const endDate = dayjs(check_out);

            while (currentDate.isBefore(endDate)) {
                const minusRoomCurrentSql = `UPDATE room_date SET room_current = room_current - 1 WHERE room_id = ? AND date = ?`;
                const minusRoomCurrentValue = [room_id, currentDate.format("YYYY-MM-DD")];
                await connection.execute(minusRoomCurrentSql, minusRoomCurrentValue);
                currentDate = currentDate.add(1, "day");
            }

            await connection.commit();

            return removeBookingRefResult;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    async getBookingRef(user_id: string, booking_id: string) {
        const connection = await pool.getConnection();

        const getBookingRefSql = `SELECT * FROM booking_ref WHERE booking_id = ? and user_id = ?`;

        const getBookingRefValue = [booking_id, user_id];

        try {
            const [rows, fields]: [ResultSetHeader[], FieldPacket[]] = await connection.execute(getBookingRefSql, getBookingRefValue);

            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async addBooking(
        user_id: string,
        { booking_id, hotel_id, room_id, total_price, check_in, check_out, name, phone_num, email }: BookingProps,
    ) {
        const connection = await pool.getConnection();

        const addBookingSql = `INSERT INTO booking (user_id, booking_id, hotel_id, room_id, total_price, check_in, check_out, name, phone_num, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const addBookingValue = [user_id, booking_id, hotel_id, room_id, total_price, check_in, check_out, name, phone_num, email];
        try {
            const [rows, fields]: [ResultSetHeader[], FieldPacket[]] = await connection.execute(addBookingSql, addBookingValue);

            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
};

export default bookingService