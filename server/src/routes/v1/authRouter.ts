import { Router } from "express";
import authController from "../../controllers/authController";

const authRouter = Router();

authRouter.get("/", authController.signUpKakao);

export default authRouter;
