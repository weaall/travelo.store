import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import CustomError from "../utils/customError";
import {
    HotelIdParams,
    RoomRegProps,
    RoomInfoProps,
    RoomServProps,
    AuthRows,
    RoomRows,
    TypeRows,
    urlRows,
} from "../interface/interfaces";
import { deleteRoomImg } from "../config/multer";

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
    async getRoomByHotel(id: string) {
        const getRoomSql = `SELECT R.id, R.name, R.num, B.id AS bed_type_id, B.name AS bed_type, V.id AS view_type_id, V.name AS view_type, discount FROM room AS R 
        LEFT JOIN bed_type AS B ON R.bed_type_id = B.id
        LEFT JOIN view_type AS V ON R.view_type_id = V.id
        WHERE hotel_id = ?`;
        const getRoomValues = [id];

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
    async getRoomById(id: string) {
        const getRoomSql = `SELECT R.id, R.name, R.num, B.id AS bed_type_id, B.name AS bed_type, V.id AS view_type_id, V.name AS view_type, discount FROM room AS R 
        LEFT JOIN bed_type AS B ON R.bed_type_id = B.id
        LEFT JOIN view_type AS V ON R.view_type_id = V.id
        WHERE R.id = ?`;
        const getRoomValues = [id];

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
    async regRoom(user_id: string, { hotel_id, name, num, bed_type_id, view_type_id }: RoomRegProps) {
        const checkAuthSql = "SELECT name FROM hotel WHERE id = ? and user_id = ?";
        const checkAuthValues = [hotel_id, user_id];

        const addRoomSql =
            "INSERT INTO room (hotel_id, name, num, bed_type_id, view_type_id, discount) VALUES (?, ?, ?, ?, ?, ?)";
        const addRoomValues = [hotel_id, name, num, bed_type_id, view_type_id, 0];

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
    async putRoomInfo(
        user_id: string,
        { hotel_id, room_id, name, bed_type_id, view_type_id }: RoomInfoProps,
        urls: string[],
    ) {
        const checkAuthSql = "SELECT name FROM hotel WHERE id = ? and user_id = ?";
        const checkAuthValues = [hotel_id, user_id];

        const putRoomInfoSql = "UPDATE room SET name = ?,bed_type_id = ?, view_type_id = ? WHERE room_id = ?";
        const putRoomInfoValues = [name, bed_type_id, view_type_id, room_id];

        const checkRoomImgSql = "SELECT url FROM room_img where room_id = ?";
        const checkRoomImgValues = [room_id];

        const deleteRoomImgSql = "DELETE FROM room_img where room_id = ?";
        const deleteRoomImgValues = [room_id];

        const addRoomImgSql = "INSERT INTO room_img (room_id, url) VALUES (?,?)";
        const addRoomImgValues = urls.map((url) => [url]);

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

            const [putRoomInfoResult] = await connection.execute(putRoomInfoSql, putRoomInfoValues);
            const [checkRoomImgResult]: [urlRows[], FieldPacket[]] = await connection.execute(
                checkRoomImgSql,
                checkRoomImgValues,
            );
            const imageUrls: string[] = checkRoomImgResult.map((row) => row.url);

            await deleteRoomImg(imageUrls);

            const [deleteHotelImgResult] = await connection.execute(deleteRoomImgSql, deleteRoomImgValues);

            if (addRoomImgValues.length > 0) {
                for (const imageUrl of urls) {
                    await connection.execute(addRoomImgSql, [room_id, imageUrl]);
                }
            }

            await connection.commit();

            return;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },
    async putRoomServ(user_id: string, { hotel_id, room_id, no_smoking, toiletries }: RoomServProps) {
        const checkAuthSql = "SELECT name FROM hotel WHERE id = ? and user_id = ?";
        const checkAuthValues = [hotel_id, user_id];

        const putRoomServSql = "UPDATE room_service SET no_smoking = ?, toiletries = ? WHERE room_id = ?";
        const putRoomServValues = [no_smoking, toiletries, room_id];

        const connection = await pool.getConnection();

        try {
            const [checkAuthResult, fields]: [AuthRows[], FieldPacket[]] = await connection.execute(
                checkAuthSql,
                checkAuthValues,
            );

            if (checkAuthResult.length === 0) {
                throw new CustomError("UNAUTHORIZED", 401);
            }

            const [putRoomServResult] = await connection.execute(putRoomServSql, putRoomServValues);

            return;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
};

export default roomService;
