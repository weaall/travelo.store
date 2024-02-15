import dotenv from "dotenv"
import router from "./routes"
import Express, { Request, Response, NextFunction } from "express"
import CustomError from "./utils/customError"
import pool from "./config/db"
import { upload } from "./config/multer"

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

app.post("/api/v1/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
        const s3FileUrl = (req.file as any).location

        const [result] = await pool.execute("INSERT INTO region (name) VALUES (?)", [s3FileUrl])

        res.status(200).json({ success: true, fileId: result })
    } catch (error) {
        console.error("파일 업로드 중 오류:", error)
        res.status(500).json({ success: false, error: "내부 서버 오류" })
    }
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
