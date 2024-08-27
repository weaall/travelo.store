import pool from "../config/db";
import { getSearchParams } from "../interface/params.interface";
import { getSearchRows } from "../interface/mysql.interface";
import { FieldPacket } from "mysql2";
import { RoomPriceRows, urlRows } from "../interface/interfaces";

const searchService = {
    async getSearch({searchValue, personNum} : getSearchParams) {

        const getSearchSql = 
            `SELECT R.hotel_id, H.name, H.postcode, H.address, H.address_detail, H.description, 
            S.wifi, S.always_check_in, S.breakfast, S.barbecue,
            F.carpark, F.restaurant, F.cafe, F.swimming_pool, F.spa, F.fitness, F.convenience_store,
            R.id as room_id, R.name as room_name, R.num as room_num, R.discount
            FROM hotel AS H 
            left join hotel_service as S on H.id = S.hotel_id 
            left join hotel_facility as F using (hotel_id)
            left join room as R using (hotel_id)
            WHERE H.permission = 1 
            and (H.name LIKE CONCAT('%', ?, '%') or H.address LIKE CONCAT('%', ?, '%')) 
            and R.num >= ?;`;

        const getSearchValue = [searchValue, searchValue, personNum];

        const connection = await pool.getConnection();
        try {
            const [getSearchResult, fields]: [getSearchRows[], FieldPacket[]] = await connection.execute(getSearchSql, getSearchValue);

            return getSearchResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    async getPriceByRoomId(room_id: string) {
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

    async getHotelImgUrl(id: string) {
        const getHotelImgSql = `SELECT url FROM hotel_img where hotel_id = ? AND url NOT LIKE '%thumbnail%'`;
        const getHotelImgValues = [id];

        const connection = await pool.getConnection();
        try {
            const [checkHotelImgResult]: [urlRows[], FieldPacket[]] = await connection.execute(
            getHotelImgSql,
            getHotelImgValues,
            );

            return checkHotelImgResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
}

export default searchService