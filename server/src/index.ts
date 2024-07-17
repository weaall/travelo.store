import dotenv from "dotenv"
import router from "./routes"
import Express, { Request, Response, NextFunction } from "express"
import CustomError from "./utils/customError"


import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import 'dayjs/locale/ko'; 
dayjs.extend(isLeapYear);
dayjs.locale('ko')

dotenv.config()

const cors = require("cors")

const app = Express()
const port = process.env.PORT
app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())
app.use(cors())

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    req.setTimeout(10000, () => {
        next(CustomError.timeoutError());
    });
    next();
});

app.use("/api", router);

app.listen(port, () => {
    console.log(`localhost:${port} connected`);
});

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }
    console.error(error);
    res.status(error.status ?? 500).json({
        error: error.message,
        data: error.data ?? null,
    });
});
