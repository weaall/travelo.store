import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_GENERATED_SECRET_KEY || "";

export const encrypt = (text: string) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (ciphertext: string)=> {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};