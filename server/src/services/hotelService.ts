import { FieldPacket } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"
import { HotelRows, RegHotelParams } from "../interface/interfaces"


const hotelService = {
    async regHotel(user_id: string, { name, address, address_detail, postcode, reg_num, bank, account, owner }: RegHotelParams, urls: string[]) {
        const checkIdSql = "SELECT * FROM hotel_reg WHERE user_id = ? AND name = ?"
        const checkIdParams = [user_id, name]

        const singUpSql =
            "INSERT INTO hotel_reg (user_id, name, address, address_detail, postcode, reg_num, bank, account, owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const singUpParams = [user_id, name, address, address_detail, postcode, reg_num, bank, account, owner]

        const urlParams = urls.map((url) => [url])
        const imageUrlsSql = "INSERT INTO hotel_reg_doc (url) VALUES (?)"

        const connection = await pool.getConnection()
        try {
            await connection.beginTransaction()

            const [rows, fields]: [HotelRows[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams)

            if (rows.length > 0) {
                throw new CustomError("이미 등록된 호텔입니다.", 409)
            }

            const [result] = await connection.execute(singUpSql, singUpParams)

            const [urlResult] = await connection.execute(imageUrlsSql, [urlParams])

            await connection.commit()
            
            return
        } catch (error) {
            await connection.rollback()
            throw error
        } finally {
            connection.release()
        }
    },

    async myHotel( user_id : string) {
        const connection = await pool.getConnection()
        
        const checkIdSql = "SELECT * FROM hotel_reg WHERE user_id = ?"
        const checkIdParams = [user_id]
        try {
            const [rows, fields]: [HotelRows[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams)

            return rows;
        } catch (error) {
            throw error
        } finally {
            connection.release()
        }
    },
}

export default hotelService
