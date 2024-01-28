import { Router } from "express";
import deptController from "../../controllers/deptController";

const deptRouter = Router();

deptRouter.get("/", deptController.getDepts);

export default deptRouter;
