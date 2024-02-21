import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import hotelController from "../../controllers/hotelController"
import { upload } from "../../config/multer"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"

const hotelRouter = Router()

hotelRouter.post(
    "/reg",
    isAuthenticated,
    upload.array("images", 3),
    asyncHandler((req: Request, res: Response) => hotelController.regHotel(req as JWTCheck, res)),
)

hotelRouter.get(
    "/me",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.myHotel(req as JWTCheck, res)),
)

hotelRouter.get(
    "/mgmt/:id",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.checkHotelById(req as JWTCheck, res)),
)


export default hotelRouter
