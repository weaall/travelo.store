import { Router } from "express";
import authController from "../../controllers/authController";
import asyncHandler from "../../utils/asyncHandler";
import { authValidator } from "../../middlewares/validator/authValidator";

const authRouter = Router();

authRouter.post("/sign-up", authValidator.signUp,asyncHandler(authController.signUp));
authRouter.post("/sign-in", authValidator.signIn,asyncHandler(authController.signIn));

authRouter.post("/kakao",  authValidator.signInByKakao,asyncHandler(authController.signInByKakao));
authRouter.post("/naver", authValidator.signInByNaver, asyncHandler(authController.signInByNaver));

authRouter.post("/naver/callback", asyncHandler(authController.signInByNaverCallback));

authRouter.post("/presignedUrl", asyncHandler(authController.presignedUrl));

export default authRouter;
