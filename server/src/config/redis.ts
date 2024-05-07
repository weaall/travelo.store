const redis = require("redis")
const util = require("util")
import dotenv from "dotenv";

dotenv.config();

const client = redis.createClient()

client.set = util.promisify(client.set)
client.get = util.promisify(client.get)

export default client

//docker run -it --link social_app:redis --rm redis redis-cli -h redis -p 6379