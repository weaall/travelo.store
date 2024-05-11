import pool from "../config/db";
import dayjs from "dayjs";
import { getSearchParams } from "../interface/params.interface";
import { getSearchRows } from "../interface/mysql.interface";
import { FieldPacket } from "mysql2";

const searchService = {
    async getSearch({searchValue, startDate, endDate, adult, child} : getSearchParams) {

        const getSearchSql = `SELECT * FROM hotel AS H 
        left join hotel_service as S on H.id = S.hotel_id 
        left join hotel_facility as F using (hotel_id)
        WHERE H.permission = 1 and H.name LIKE CONCAT('%','힐튼','%') or H.address LIKE CONCAT('%','우리집','%')";`

        const getSearchValue = [searchValue]

        const connection = await pool.getConnection();
        try {
            const [getSearchResult, fields]: [getSearchRows[], FieldPacket[]] = await connection.execute(getSearchSql);

            return getSearchResult;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
}

export default searchService