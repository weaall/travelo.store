import client from "../config/redis";

export function getRedis(key: string) {
    return Promise.race([
        client.get(key),
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error("Redis timeout")), 200);
        }),
    ]);
}

export function setRedis(key : string, data: Object) {
    client.set(key, JSON.stringify(data));
}


