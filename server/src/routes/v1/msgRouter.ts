import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"
import msgController from "../../controllers/msgController"

const msgRouter = Router()

msgRouter.post(
    "/send",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  msgController.addMsg(req as JWTCheck, res)),
)

msgRouter.get(
    "/chat/:id",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  msgController.getMsgByBothId(req as JWTCheck, res)),
)

msgRouter.get(
    "/me",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  msgController.getMsgByUserId(req as JWTCheck, res)),
)

export default msgRouter