import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import { JWTCheck } from "../../interface/interfaces"
import isAuthenticated from "../../middlewares/isAuthenticated"
import bookingController from "../../controllers/bookingController"


const bookingRouter = Router();

bookingRouter.post(
    "/ref",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => bookingController.addBookingRef(req as JWTCheck, res)),
);


bookingRouter.get("/confirm", asyncHandler(bookingController.confirm));

bookingRouter.post("/remove", asyncHandler(bookingController.removeBookingRef));

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
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => bookingController.getBookingById(req as JWTCheck, res)),
);

export default bookingRouter;