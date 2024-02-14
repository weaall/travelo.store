import { FieldPacket } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"
import { HotelRows, RegHotelParams } from "../interface/interfaces"

const hotelService = {
    async regHotel({ user_id, name, region_id, address, address_detail, postcode, reg_num, bank, account, account_owner }: RegHotelParams) {
        const checkIdSql = "SELECT * FROM hotel_reg WHERE user_id = ? AND name = ?"
        const checkIdParams = [user_id, name]
        const singUpSql =
            "INSERT INTO hotel_reg (user_id, name, region_id, address, address_detail, postcode, reg_num, bank, account, account_owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const singUpParams = [user_id, name, region_id, address, address_detail, postcode, reg_num, bank, account, account_owner]
        try {
            const [rows, fields]: [HotelRows[], FieldPacket[]] = await pool.execute(checkIdSql, checkIdParams)

            if (rows.length > 0) {
                throw new CustomError("이미 등록된 호텔입니다.", 409)
            }

            const [result] = await pool.execute(singUpSql, singUpParams)

            return
        } catch (error) {
            throw error
        }
    },

    async checkHotelRegList({ user_id}) {
        const checkIdSql = "SELECT * FROM hotel_reg WHERE user_id = ?"
        const checkIdParams = [user_id]
        try {
            const [rows, fields]: [HotelRows[], FieldPacket[]] = await pool.execute(checkIdSql, checkIdParams)

            return rows;
        } catch (error) {
            throw error
        }
    },
}

export default hotelService
