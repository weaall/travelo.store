import { Router } from "express"
import asyncHandler from "../../utils/asyncHandler"
import hotelController from "../../controllers/hotelController"
import { upload } from "../../config/multer"

const hotelRouter = Router()

hotelRouter.post("/reg", upload.single("image"), asyncHandler(hotelController.regHotel))

export default hotelRouter
