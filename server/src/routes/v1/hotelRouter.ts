import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import hotelController from "../../controllers/hotelController"
import { uploadRegDoc, uploadHotelImg } from "../../config/multer"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"

const hotelRouter = Router()

hotelRouter.get("/img/:id", asyncHandler(hotelController.getHotelImgUrl));

hotelRouter.post(
    "/reg",
    isAuthenticated,
    uploadRegDoc.array("images", 3),
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

hotelRouter.get(
    "/mgmt/info/:id",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.getHotelInfoById(req as JWTCheck, res)),
)

hotelRouter.put(
    "/mgmt/info",
    isAuthenticated,
    uploadHotelImg.array("images", 10),
    asyncHandler((req: Request, res: Response) => hotelController.putHotelInfo(req as JWTCheck, res)),
)

hotelRouter.put(
    "/mgmt/serv",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.putHotelServ(req as JWTCheck, res)),
)

hotelRouter.put(
    "/mgmt/facil",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.putHotelFacil(req as JWTCheck, res)),
)


export default hotelRouter
