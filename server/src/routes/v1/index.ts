import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import hotelRouter from "./hotelRouter";
import roomRouter from "./roomRouter";
import searchRouter from "./searchRouter";
import bookingRouter from "./bookingRouter";

const V1Router = Router();

V1Router.use("/auth", authRouter);
V1Router.use("/user", userRouter);
V1Router.use("/hotel", hotelRouter);
V1Router.use("/room", roomRouter);
V1Router.use("/search", searchRouter);
V1Router.use("/booking", bookingRouter);

export default V1Router;
