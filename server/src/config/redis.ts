const Redis = require("ioredis");
import util from "util";

// const client = new Redis({
//     retryStrategy: (times : number) => {
//         console.log(`Redis reconnect #${times}`);
//         return 1000 * 300;
//     }
// });

// client.set = util.promisify(client.set);

// client.on("connect", () => {
//     console.log("Redis client connected");
// });

// export default client;

const client = new Redis({
    host: process.env.REDIS_HOST || 'redis',
    port: 6379,
    retryStrategy: (times: number) => {
        console.log(`Redis reconnect #${times}`);
        return 1000 * 300;
    }
});

client.set = util.promisify(client.set);

client.on("connect", () => {
    console.log("Redis client connected");
});

export default client;