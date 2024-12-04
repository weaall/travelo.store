import client from "../config/redis";

export function getRedis(key: string) {
    return Promise.race([
        client.get(key),
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error("Redis timeout")), 200);
        }),
    ]);
}

export async function setRedis(key: string, data: Object) {
    await client.set(key, JSON.stringify(data));
}

export async function setRedis1H(key: string, data: Object, ttl = 3600) {
    await client.set(key, JSON.stringify(data), "EX", ttl);
}

export async function setRedis1D(key: string, data: Object, ttl = 86400) {
    await client.set(key, JSON.stringify(data), "EX", ttl);
}

export async function setRedis1W(key: string, data: Object, ttl = 604800) {
    await client.set(key, JSON.stringify(data), "EX", ttl);
}

export async function msetRedis1D(pairs: { key: string, data: Object }[], ttl = 86400) {
    try {
        await client.watch(pairs.map(pair => pair.key));

        const multi = client.multi();
        pairs.forEach(({ key, data }) => {
            multi.set(key, JSON.stringify(data), 'EX', ttl);
        });

        await multi.exec();
    } catch (error) {
        console.error('Failed to set multiple keys in Redis:', error);
    }
}

export async function delRedis(key: string) {
    await client.del(key);
}
