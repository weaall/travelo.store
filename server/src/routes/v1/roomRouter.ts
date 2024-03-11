import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import roomController from "../../controllers/roomController"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"

const roomRouter = Router()

roomRouter.get("/hotel/:id", asyncHandler(roomController.getRoomByHotel));

export default roomRouter