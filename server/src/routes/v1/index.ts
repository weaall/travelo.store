import { Router } from "express";
import authRouter from "./authRouter";

const V1Router = Router();

V1Router.use("/auth", authRouter);

export default V1Router;
