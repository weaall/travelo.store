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
