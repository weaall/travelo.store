import dotenv from "dotenv"
import router from "./routes"
import Express, { Request, Response, NextFunction } from "express"
import CustomError from "./utils/customError"

dotenv.config()

const cors = require("cors")

const app = Express()
const port = process.env.PORT
app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())
app.use(cors())

app.use("/api", router)

app.listen(port, () => {
    console.log(`localhost:${port} connected`)
})


app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    if (error.status !== undefined && Math.floor(error.status / 100) === 5) {
        console.error(error)
    }
    res.status(error.status ?? 500).json({
        error: error.message,
        data: null,
    })
})
