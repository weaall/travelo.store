import { FieldPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"
import { AuthRows, RoomRows, TypeRows } from "../interface/interfaces";

const roomService = {
    async getBedType() {
        const getBedTypeSql = "SELECT * FROM bed_type";

        const connection = await pool.getConnection();
        try {
            const [getBedTypeResult, fields]: [TypeRows[], FieldPacket[]] = await connection.execute(getBedTypeSql);

            return getBedTypeResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
    async getViewType() {
        const getViewTypeSql = "SELECT * FROM view_type";

        const connection = await pool.getConnection();
        try {
            const [getViewTypeResult, fields]: [TypeRows[], FieldPacket[]] = await connection.execute(getViewTypeSql);

            return getViewTypeResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
    async getRoom({ hotel_id }) {
        const getRoomSql = "SELECT * FROM room WHERE hotel_id = ?";
        const getRoomValues = [hotel_id];

        const connection = await pool.getConnection();
        try {
            const [getRoomResult, fields]: [RoomRows[], FieldPacket[]] = await connection.execute(
                getRoomSql,
                getRoomValues,
            );

            return getRoomResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
    async regRoom(user_id: string, { hotel_id, name, bed_type_id, view_type_id }) {
        const checkAuthSql = "SELECT name FROM hotel WHERE id = ? and user_id = ?";
        const checkAuthValues = [hotel_id, user_id];

        const addRoomSql =
            "INSERT INTO room (hotel_id, name, bed_type_id, view_type_id, discount) VALUES (?, ?, ?, ?, ?)";
        const addRoomValues = [hotel_id, name, bed_type_id, view_type_id, 0];

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const [checkAuthResult, fields]: [AuthRows[], FieldPacket[]] = await connection.execute(
                checkAuthSql,
                checkAuthValues,
            );

            if (checkAuthResult.length === 0) {
                throw new CustomError("UNAUTHORIZED", 401);
            }

            const [addRoomResult]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
                addRoomSql,
                addRoomValues,
            );

            await connection.commit();

            return;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },
};

export default roomService;