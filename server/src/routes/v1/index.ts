import { Router } from "express";
import deptRouter from "./deptRouter";
import authRouter from "./authRouter";

const V1Router = Router();

V1Router.use("/auth", authRouter);
V1Router.use("/dept", deptRouter);

export default V1Router;
