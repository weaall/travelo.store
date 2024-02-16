import { FieldPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"

const hotelService = {
    async checkHotelReg() {
        const checkIdSql = "SELECT * FROM hotel_reg"
        const connection = await pool.getConnection()
        try {
            const [result, fields]: [ResultSetHeader, FieldPacket[]] = await connection.execute(checkIdSql)

            return result
        } catch (error) {
            throw error
        }
    },
}

export default hotelService
