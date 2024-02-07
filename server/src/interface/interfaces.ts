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
