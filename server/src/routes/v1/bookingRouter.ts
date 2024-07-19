import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"
import bookingController from "../../controllers/bookingController"
import { bookingValidator } from "../../middlewares/validator/bookingValidator"
import { validateError } from "../../middlewares/validator/validateError"


const bookingRouter = Router();

bookingRouter.post(
    "/ref",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => bookingController.addBookingRef(req as JWTCheck, res)),
);

bookingRouter.get("/confirm", bookingValidator.confirmBooking, validateError, asyncHandler(bookingController.confirmBooking));

bookingRouter.delete("/delete/:id", bookingValidator.deleteBookingRef, validateError, asyncHandler(bookingController.deleteBookingRef));

bookingRouter.get(
    "/user",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => bookingController.getBookingByUserId(req as JWTCheck, res)),
);

bookingRouter.get(
    "/review",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => bookingController.getReviewByUserId(req as JWTCheck, res)),
);


bookingRouter.get(
    "/:id",
    bookingValidator.getBookingById, validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => bookingController.getBookingById(req as JWTCheck, res)),
);

export default bookingRouter;