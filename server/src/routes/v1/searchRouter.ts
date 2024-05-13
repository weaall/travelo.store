import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import { searchController } from "../../controllers/searchController";

const searchRouter = Router()

searchRouter.get("/", asyncHandler(searchController.getSearch));

export default searchRouter