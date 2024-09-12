import { Router } from "express";
import authController from "../../controllers/authController";
import asyncHandler from "../../utils/asyncHandler";
import { authValidator } from "../../middlewares/validator/authValidator";
import { validateError } from "../../middlewares/validator/validateError";

const authRouter = Router();

authRouter.post("/sign-up", authValidator.signUp, validateError, asyncHandler(authController.signUp));
authRouter.post("/sign-in", authValidator.signIn, validateError, asyncHandler(authController.signIn));

authRouter.post("/kakao", authValidator.signInByKakao, validateError, asyncHandler(authController.signInByKakao));
authRouter.post("/naver", authValidator.signInByNaver, validateError, asyncHandler(authController.signInByNaver));

authRouter.post("/naver/callback", authValidator.signInByNaverCallback, validateError, asyncHandler(authController.signInByNaverCallback));

authRouter.post("/presignedUrls", authValidator.presignedUrls, validateError, asyncHandler(authController.presignedUrls));
authRouter.post("/send/email", asyncHandler(authController.sendEmailBySES));

export default authRouter;
