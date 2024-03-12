import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import roomController from "../../controllers/roomController"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"

const roomRouter = Router()

roomRouter.get("/hotel/:id", asyncHandler(roomController.getRoomByHotel));
roomRouter.get("/bed", asyncHandler(roomController.getBedType));
roomRouter.get("/view", asyncHandler(roomController.getViewType));

export default roomRouter