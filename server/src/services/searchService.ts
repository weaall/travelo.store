import pool from "../config/db";
import dayjs from "dayjs";
import { getSearchParams } from "../interface/params.interface";
import { getSearchRows } from "../interface/mysql.interface";
import { FieldPacket } from "mysql2";

const searchService = {
    async getSearchHotel({searchValue, adult, child} : getSearchParams) {

        const getSearchSql = 
            `SELECT * FROM hotel AS H 
            left join hotel_service as S on H.id = S.hotel_id 
            left join hotel_facility as F using (hotel_id)
            left join room as R using (hotel_id)
            WHERE H.permission = 1 
            and (H.name LIKE CONCAT('%', ?, '%') or H.address LIKE CONCAT('%', ?, '%')) 
            and R.num >= ?;`;

        const getSearchValue = [searchValue, searchValue, adult + child];

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
}

export default searchService