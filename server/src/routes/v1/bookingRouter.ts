import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"
import bookingController from "../../controllers/bookingController"


const bookingRouter = Router()

bookingRouter.post(
    "/",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  bookingController.addBooking(req as JWTCheck, res)),
)

bookingRouter.post(
    "/ref",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  bookingController.addBookingRef(req as JWTCheck, res)),
)

bookingRouter.post(
    "/rollback",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) =>  bookingController.rollBackBookingRef(req as JWTCheck, res)),
)

bookingRouter.get("/confirm", asyncHandler(bookingController.confirm));

export default bookingRouter;