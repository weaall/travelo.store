import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";

const V1Router = Router();

V1Router.use("/auth", authRouter);
V1Router.use("/user", userRouter);

export default V1Router;
