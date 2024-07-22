import { Router, Request, Response } from "express";
import isAuthenticated from "../../middlewares/isAuthenticated";
import asyncHandler from "../../utils/asyncHandler";
import userController from "../../controllers/userController";
import { JWTCheck } from "../../interface/interfaces";
import { userValidator } from "../../middlewares/validator/userValidator";
import { validateError } from "../../middlewares/validator/validateError";

const userRouter = Router();

userRouter.get(
    "/me",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => userController.me(req as JWTCheck, res)),
);

userRouter.put(
    "/updateMe",
    userValidator.putMyInfo,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => userController.putMyInfo(req as JWTCheck, res)),
);

userRouter.get("/name/:id", userValidator.getNameByUserId, validateError, asyncHandler(userController.getNameByUserId));
userRouter.get("/email/:id", userValidator.checkEmail, validateError, asyncHandler(userController.checkEmail));

export default userRouter;
