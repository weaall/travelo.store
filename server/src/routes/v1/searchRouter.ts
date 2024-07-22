import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import { searchController } from "../../controllers/searchController";
import { validateError } from "../../middlewares/validator/validateError";
import { SearchValidator } from "../../middlewares/validator/searchValidator";

const searchRouter = Router()

searchRouter.get("/", SearchValidator.getSearch, validateError, asyncHandler(searchController.getSearch));

export default searchRouter