import { Router } from "express";
import authController from "../../controllers/authController";
import asyncHandler from "../../utils/asyncHandler";

const authRouter = Router();

authRouter.post("/sign-up", asyncHandler(authController.signUp));
authRouter.post("/sign-in", asyncHandler(authController.signIn));
authRouter.post("/kakao", asyncHandler(authController.signInKakao));

authRouter.post("/presignedUrl", asyncHandler(authController.presignedUrl));

export default authRouter;
