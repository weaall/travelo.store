import { FieldPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"
import CustomError from "../utils/customError"
import { HotelRows, HotelServProps, RegHotelParams } from "../interface/interfaces"


const hotelService = {
    async regHotel(user_id: string, { name, address, address_detail, postcode, reg_num, bank, account, owner }: RegHotelParams, urls: string[]) {
        const addHotelSql = "INSERT INTO hotel (user_id, name, postcode, address, address_detail) VALUES (?, ?, ?, ?, ?)"
        const addHotelValues = [user_id, name, postcode, address, address_detail]

        const addHotelRegSql = "INSERT INTO hotel_reg (hotel_id, reg_num, bank, account, owner) VALUES (?, ?, ?, ?, ?)"
        const addHotelRegValues = [reg_num, bank, account, owner]

        const addHotelServSql = "INSERT INTO hotel_service (hotel_id) VALUES (?)"

        const addHotelFacilSql = "INSERT INTO hotel_facility (hotel_id) VALUES (?)"

        const addRegDocSql = "INSERT INTO hotel_reg_doc (hotel_id, url) VALUES (?,?)"
        const addRegDocValues = urls.map((url) => [url])

        const connection = await pool.getConnection()
        try {
            await connection.beginTransaction()

            const [addHotelResult]: [ResultSetHeader, FieldPacket[]] = await connection.execute(addHotelSql, addHotelValues)

            const hotel_id = addHotelResult.insertId

            const [addHotelRegResult] = await connection.execute(addHotelRegSql, [hotel_id, ...addHotelRegValues])
            const [addHotelServResult] = await connection.execute(addHotelServSql, hotel_id)
            const [addHotelFacilResult] = await connection.execute(addHotelFacilSql, hotel_id)
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

    async myHotel(user_id: string) {
        const connection = await pool.getConnection()

        const checkIdSql = "SELECT * FROM hotel WHERE user_id = ?"
        const checkIdParams = [user_id]
        try {
            const [rows, fields]: [HotelRows[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams)

            return rows
        } catch (error) {
            throw error
        } finally {
            connection.release()
        }
    },

    async checkHotelById(user_id: string, id: string) {
        const connection = await pool.getConnection()

        const checkIdSql = "SELECT * FROM hotel WHERE user_id = ? and id = ?"
        const checkIdParams = [user_id, id]
        try {
            const [rows, fields]: [HotelRows[], FieldPacket[]] = await connection.execute(checkIdSql, checkIdParams)

            return rows
        } catch (error) {
            throw error
        } finally {
            connection.release()
        }
    },

    async getHotelInfoById(user_id: string, hotel_id: string) {
        const connection = await pool.getConnection()

        const getHotelInfoSql =
            "SELECT * FROM hotel AS H left join hotel_service as S on H.id = S.hotel_id left join hotel_facility as F using (hotel_id) where user_id = ? and  H.id = ? "
        const getHotelInfoSqlParams = [user_id, hotel_id]

        try {

            const [rows, fields]: [HotelRows[], FieldPacket[]] = await connection.execute(getHotelInfoSql, getHotelInfoSqlParams)

            return rows
        } catch (error) {
            throw error
        } finally {
            connection.release()
        }
    },

    async putHotelServ(user_id: string, {hotel_id, wifi, always_check_in, breakfast, breakfast_price, barbeque}: HotelServProps) {
        const connection = await pool.getConnection()

        const checkAuthSql = "SELECT * FROM hotel WHERE id = ? and user_id = ?"
        const checkAuthParams = [hotel_id, user_id]

        const putHotelServSql = 
        "UPDATE hotel_service SET wifi = ?, always_check_in = ?, breakfast = ?, breakfast_price = ?, barbeque = ? WHERE hotel_id = ?"
        const putHotelServParams = [wifi, always_check_in, breakfast, breakfast_price, barbeque, hotel_id]

        try {

            const [rows, fields]: [HotelRows[], FieldPacket[]] = await connection.execute(checkAuthSql, checkAuthParams)

            if (rows.length === 0) {
                throw new CustomError("UNAUTHORIZED", 401)
            }

            const [putHotelServResult] = await connection.execute(putHotelServSql, putHotelServParams)

            return 
        } catch (error) {
            throw error
        } finally {
            connection.release()
        }
    },

    async putHotelFacil(user_id: string, hotel_id: string) {
        const connection = await pool.getConnection()

        const checkAuthSql = "SELECT * FROM hotel WHERE id = ? and user_id = ?"
        const checkAuthParams = [hotel_id, user_id]

        const putHotelFacilSql = 
        "UPDATE hotel_facility SET carpark = ?, restaurant = ?, cafe = ?, pool = ?, spa = ?, fitness = ?, convenience_store = ? WHERE hotel_id = ?"
        const putHotelFacilParams = [hotel_id]

        try {

            const [rows, fields]: [HotelRows[], FieldPacket[]] = await connection.execute(checkAuthSql, checkAuthParams)

            if (rows.length === 0) {
                throw new CustomError("UNAUTHORIZED", 401)
            }

            const [putHotelFacilResult] = await connection.execute(putHotelFacilSql, putHotelFacilParams)

            return 
        } catch (error) {
            throw error
        } finally {
            connection.release()
        }
    },
}

export default hotelService
