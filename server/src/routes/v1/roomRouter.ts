import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import roomController from "../../controllers/roomController"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"

const roomRouter = Router()

roomRouter.get("/hotel/:id", asyncHandler(roomController.getRoomByHotel));

roomRouter.get("/bed",asyncHandler(roomController.getBedType));

roomRouter.get("/view", asyncHandler(roomController.getViewType));

roomRouter.get("/:id", asyncHandler(roomController.getRoomById));

roomRouter.post(
    "/reg",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => roomController.regRoom(req as JWTCheck, res)),
);

export default roomRouter