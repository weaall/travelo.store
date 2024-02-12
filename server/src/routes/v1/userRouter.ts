import { Router, Request, Response } from "express";
import isAuthenticated from "../../middlewares/isAuthenticated";
import asyncHandler from "../../utils/asyncHandler";
import userController from "../../controllers/userController";
import { JWTCheck } from "../../interface/interfaces";

const userRouter = Router();

userRouter.get("/me", isAuthenticated,
    asyncHandler((req: Request, res: Response) => userController.me(req as JWTCheck, res))
);


export default userRouter;