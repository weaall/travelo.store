import { Router } from "express";
import deptRouter from "./deptRouter";

const V1Router = Router();

V1Router.use("/dept", deptRouter);

export default V1Router;
