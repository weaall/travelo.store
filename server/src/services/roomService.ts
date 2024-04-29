import { FieldPacket, ResultSetHeader } from "mysql2";
import dayjs from "dayjs";
import pool from "../config/db";
import CustomError from "../utils/customError";
import {
    HotelIdParams,
    RoomRegProps,
    RoomInfoProps,
    RoomServProps,
    MonthPriceProps,
    AuthRows,
    RoomRows,
    TypeRows,
    urlRows,
    RoomPriceRows,
    DatePriceProps
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
        const getRoomSql = `SELECT R.hotel_id, R.id AS room_id, R.name, R.num, B.id AS bed_type_id, B.name AS bed_type, V.id AS view_type_id, V.name AS view_type, discount FROM room AS R 
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

    async getRoomImgUrl(id: string) {
        const connection = await pool.getConnection();

        const checkRoomImgSql = "SELECT url FROM room_img where room_id = ?";
        const checkRoomImgParams = [id];
        try {
            const [checkRoomImgResult]: [urlRows[], FieldPacket[]] = await connection.execute(
                checkRoomImgSql,
                checkRoomImgParams,
            );

            return checkRoomImgResult;
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
        { hotel_id, room_id, name, num, bed_type_id, view_type_id }: RoomInfoProps,
        urls: string[],
    ) {
        const checkAuthSql = "SELECT name FROM hotel WHERE id = ? and user_id = ?";
        const checkAuthValues = [hotel_id, user_id];

        const putRoomInfoSql = "UPDATE room SET name = ?, num = ?, bed_type_id = ?, view_type_id = ? WHERE id = ?";
        const putRoomInfoValues = [name, num, bed_type_id, view_type_id, room_id];

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
    async getPriceByRoom(room_id: string) {
        const getPriceSql = `
            SELECT date_format(date, '%Y-%m-%d') date, price, room_current, room_limit FROM room_date 
            WHERE room_id = ?`;

        const getPriceValues = [room_id];

        const connection = await pool.getConnection();
        try {
            const [getPriceResult, fields]: [RoomPriceRows[], FieldPacket[]] = await connection.execute(
                getPriceSql,
                getPriceValues,
            );

            return getPriceResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
    async insertPriceByDate(
        user_id: string,
        { hotel_id, room_id, year, month, date, price, room_limit }: DatePriceProps,
    ) {
        const roomAuthSql = `SELECT room.name FROM room
            INNER JOIN hotel ON room.hotel_id = hotel.id
            WHERE hotel_id = ? AND room.id = ? AND user_id = ?`;
        const roomAuthValues = [hotel_id, room_id, user_id];

        const insertPriceSql = `
            INSERT INTO room_date (room_id, date, price, room_current, room_limit) 
            VALUES (?, ?, ?, 0, ?) 
            ON DUPLICATE KEY UPDATE 
            price = VALUES(price), room_limit = VALUES(room_limit)`;

        const insertPriceValues = [room_id, `${year}-${month}-${date}`, price, room_limit];

        const connection = await pool.getConnection();

        try {
            const [roomAuthResult, fields]: [AuthRows[], FieldPacket[]] = await connection.execute(
                roomAuthSql,
                roomAuthValues,
            );

            if (roomAuthResult.length === 0) {
                throw new CustomError("UNAUTHORIZED", 401);
            }

            await connection.execute(insertPriceSql, insertPriceValues);

            return;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
    async insertPriceByMonth(
        user_id: string,
        { hotel_id, room_id, year, month, days, friday, saturday, room_limit }: MonthPriceProps,
    ) {
        const roomAuthSql = `SELECT room.name FROM room
            INNER JOIN hotel ON room.hotel_id = hotel.id
            WHERE hotel_id = ? AND room.id = ? AND user_id = ?`;
        const roomAuthValues = [hotel_id, room_id, user_id];

        const insertPriceSql = `
            INSERT INTO room_date (room_id, date, price, room_current, room_limit) 
            VALUES (?, ?, ?, 0, ?) 
            ON DUPLICATE KEY UPDATE 
            price = VALUES(price), room_limit = VALUES(room_limit)`;

        const connection = await pool.getConnection();

        try {
            const [roomAuthResult, fields]: [AuthRows[], FieldPacket[]] = await connection.execute(
                roomAuthSql,
                roomAuthValues,
            );

            if (roomAuthResult.length === 0) {
                throw new CustomError("UNAUTHORIZED", 401);
            }

            await connection.beginTransaction();

            const firstDayOfMonth = dayjs(`${year}-${month}-01`);
            const daysInMonth = firstDayOfMonth.daysInMonth();

            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = dayjs(`${year}-${month}-${day}`);
                const dayOfWeek = currentDate.day();

                let price = days;

                if (dayOfWeek === 5) {
                    price = friday;
                } else if (dayOfWeek === 6) {
                    price = saturday;
                }

                const insertPriceValues = [room_id, currentDate.format("YYYY-MM-DD"), price, room_limit];
                await connection.execute(insertPriceSql, insertPriceValues);
            }

            await connection.commit();

            return;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
};

export default roomService;
