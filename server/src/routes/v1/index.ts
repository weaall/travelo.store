import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import hotelRouter from "./hotelRouter";

const V1Router = Router();

V1Router.use("/auth", authRouter);
V1Router.use("/user", userRouter);
V1Router.use("/hotel", hotelRouter);

export default V1Router;
