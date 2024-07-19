import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"
import msgController from "../../controllers/msgController"
import { validateError } from "../../middlewares/validator/validateError"
import { msgValidator } from "../../middlewares/validator/msgValidator"

const msgRouter = Router()

msgRouter.post(
    "/send",
    msgValidator.sendMsg,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  msgController.sendMsg(req as JWTCheck, res)),
)

msgRouter.post(
    "/hotel/send",
    msgValidator.sendMsgFromHotel,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  msgController.sendMsgFromHotel(req as JWTCheck, res)),
)

msgRouter.get(
    "/chat/:id",
    msgValidator.getMsgByBothId,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  msgController.getMsgByBothId(req as JWTCheck, res)),
)

msgRouter.get(
    "/me",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  msgController.getMsgByUserId(req as JWTCheck, res)),
)

msgRouter.get(
    "/hotel/:id",
    msgValidator.getMsgByHotelId,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  msgController.getMsgByHotelId(req as JWTCheck, res)),
)

msgRouter.get(
    "/hotel/chat/:hotel_id/:user_id",
    msgValidator.getMsgFromHotel,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  msgController.getMsgFromHotel(req as JWTCheck, res)),
)

export default msgRouter