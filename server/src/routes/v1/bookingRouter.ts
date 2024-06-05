import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"
import bookingController from "../../controllers/bookingController"


const bookingRouter = Router()

bookingRouter.post(
    "/ref",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  bookingController.addBookingRef(req as JWTCheck, res)),
)

export default bookingRouter