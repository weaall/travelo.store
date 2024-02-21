import { RowDataPacket } from "mysql2/promise";
import { Request } from "express";

export interface userRowsProps extends RowDataPacket{
    id: number;
    email: string;
    password: string;
    name: string;
    phone_num: string;
    social: string;
    social_id: string;
    admin: number;
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


export interface HotelRows extends RowDataPacket{
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

export interface RegHotelParams{
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