import { FieldPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"

const hotelService = {
    async checkHotelReg() {
        const checkIdSql = "SELECT * FROM hotel_reg"
        try {
            const [result, fields]: [ResultSetHeader, FieldPacket[]] = await pool.execute(checkIdSql)

            return result
        } catch (error) {
            throw error
        }
    },
}

export default hotelService
