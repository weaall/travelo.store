import { RowDataPacket } from "mysql2/promise";
import { Request } from "express";

export interface userRowsProps extends RowDataPacket {
    id: number;
    email: string;
    password: string;
    name: string;
    phone_num: string;
    social: string;
    social_id: string;
    admin: number;
}

export interface urlRows extends RowDataPacket {
    url: string;
}

export interface JWTCheck extends Request {
    user: {
        id: string;
        ad: string;
    };
}

export interface userDataProps {
    id: number;
    email: string;
    password: string;
    name: string;
    phone_num: string;
    social: string;
    social_id: string;
    admin: number;
}

export interface SignUpParams {
    email: string;
    password: string;
    name: string;
    phone_num: string;
}

export interface SignInParams {
    email: string;
    password: string;
}

export interface HotelIdParams {
    hotel_id: number;
}

export interface HotelRows extends RowDataPacket {
    id: number;
    user_id: number;
    name: string;
    postcode: number;
    address: string;
    address_detail: string;
    description: string;
    check_in: string;
    check_out: string;
    tel_num: string;
    permission: number;
}

export interface AuthRows extends RowDataPacket {
    name: string;
}

export interface TypeRows extends RowDataPacket {
    id: number;
    name: string;
}

export interface RoomRows extends RowDataPacket {
    id: number;
    name: string;
    num: number;
    bed_type_id: number;
    bed_type: string;
    view_type_id: number;
    view_type: string;
    discount: number;
}

export interface HotelInfoRows extends RowDataPacket {
    id: number;
    name: string;
    postcode: number;
    address: string;
    address_detail: string;
    description: string;
    check_in: string;
    check_out: string;
    tel_num: number;
    permission: number;
    wifi: number;
    always_check_in: number;
    breakfast: number;
    breakfast_price: number;
    barbecue: number;
    carpark: number;
    restaurant: number;
    cafe: number;
    pool: number;
    spa: number;
    fitness: number;
    convenience_store: number;
}

export interface RegHotelParams {
    user_id: number;
    name: string;
    address: string;
    address_detail: string;
    postcode: number;
    reg_num: number;
    bank: string;
    account: number;
    owner: string;
}

export interface HotelInfoProps {
    hotel_id: number;
    description: string;
    check_in: number;
    check_out: number;
    tel_num: number;
}

export interface HotelServProps {
    hotel_id: number;
    wifi: number;
    always_check_in: number;
    breakfast: number;
    breakfast_price: number;
    barbecue: number;
}

export interface HotelFacilProps {
    hotel_id: number;
    carpark: number;
    restaurant: number;
    cafe: number;
    swimming_pool: number;
    spa: number;
    fitness: number;
    convenience_store: number;
}

export interface RoomRegProps {
    hotel_id: number;
    name: string;
    num: number;
    bed_type_id: number;
    view_type_id: number;
}

export interface RoomInfoProps {
    hotel_id: number;
    room_id: number;
    name: string;
    num: number;
    bed_type_id: number;
    view_type_id: number;
}

export interface RoomServProps {
    hotel_id: number;
    room_id: number;
    no_smoking: number;
    toiletries: number;
}

export interface RoomPriceRows extends RowDataPacket{
    room_id: number;
    date: string;
    price: number;
    room_current: number;
    room_limit: number;
}

export interface MonthPriceProps {
    hotel_id: number;
    room_id: number;
    year: number;
    month: number;
    days: number;
    friday: number;
    saturday: number;
    room_limit: number;
}

export interface DatePriceProps {
    hotel_id: number;
    room_id: number;
    year: number;
    month: number;
    date: number;
    price: number;
    room_limit: number;
}
