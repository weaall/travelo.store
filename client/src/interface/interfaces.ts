export interface userDataProps {
    id: number;
    email: string;
    name: string;
    phone_num: string;
    social: string;
}

export interface RegHotelProps{
    name: string;
    address: string;
    address_detail: string;
    postcode: number;
    reg_num: number;
    bank: string;
    account: number;
    owner: string;
}

export interface HotelDataProps{
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
}

