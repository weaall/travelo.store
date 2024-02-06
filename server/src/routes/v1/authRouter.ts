import { Router } from "express";
import authController from "../../controllers/authController";
import asyncHandler from "../../utils/asyncHandler";

const authRouter = Router();

authRouter.post("/kakao", asyncHandler(authController.signInKakao));

export default authRouter;
