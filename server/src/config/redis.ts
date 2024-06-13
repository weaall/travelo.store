const Redis = require("ioredis");
import util from "util";

const client = new Redis({
    retryStrategy: (times : number) => {
        console.log(`Redis reconnect #${times}`);
        return 10000 * 60;
    }
});

client.set = util.promisify(client.set);
client.get = util.promisify(client.get);

client.on("connect", () => {
    console.log("Redis client connected");
});

export default client;

//docker run -it --link social_app:redis --rm redis redis-cli -h redis -p 6379
