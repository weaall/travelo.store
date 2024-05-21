import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_GENERATED_SECRET_KEY || "";

export const encrypt = (params: string) => {
    const ciphertext = CryptoJS.AES.encrypt(params, secretKey, { 
        format: CryptoJS.format.OpenSSL, 
        mode: CryptoJS.mode.CBC, 
        padding: CryptoJS.pad.Pkcs7,
    });
    return encodeURIComponent(ciphertext.toString());
};

export const decrypt = (params: string) => {
    const bytes = CryptoJS.AES.decrypt(params, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};