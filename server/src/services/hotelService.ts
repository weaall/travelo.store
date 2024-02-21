import { FieldPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"
import { HotelRows, RegHotelParams } from "../interface/interfaces"


const hotelService = {
    async regHotel(user_id: string, { name, address, address_detail, postcode, reg_num, bank, account, owner }: RegHotelParams, urls: string[]) {

        const addHotelSql =
            "INSERT INTO hotel (user_id, name, postcode, address, address_detail) VALUES (?, ?, ?, ?, ?)"
        const addHotelValues = [user_id, name, postcode, address, address_detail]

        const addHotelRegSql =  "INSERT INTO hotel_reg (hotel_id, reg_num, bank, account, owner) VALUES (?, ?, ?, ?, ?)"
        const addHotelRegValues = [reg_num, bank, account, owner]

        const addRegDocSql = "INSERT INTO hotel_reg_doc (hotel_id, url) VALUES (?,?)"
        const addRegDocValues = urls.map((url) => [url])

        const connection = await pool.getConnection()
        try {
            await connection.beginTransaction()

            const [addHotelResult] : [ResultSetHeader, FieldPacket[]] = await connection.execute(addHotelSql, addHotelValues)

            const hotel_id = addHotelResult.insertId;

            console.log([hotel_id, ...addHotelRegValues])

            const [addHotelRegResult] = await connection.execute(addHotelRegSql, [hotel_id, ...addHotelRegValues])

            const [addRegDocResult] = await connection.execute(addRegDocSql, [hotel_id, ...addRegDocValues])

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
        
        const checkIdSql = "SELECT * FROM hotel WHERE user_id = ?"
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

    async checkHotelById( user_id : string, id : string) {
        const connection = await pool.getConnection()
        
        const checkIdSql = "SELECT * FROM hotel WHERE user_id = ? and id = ?"
        const checkIdParams = [user_id, id]
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
