import { Router, Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import roomController from "../../controllers/roomController"
import { JWTCheck } from "../../interface/interfaces"
import { uploadRoomImg } from "../../config/multer"
import isAuthenticated from "../../middlewares/isAuthenticated"

const roomRouter = Router()

roomRouter.get("/hotel/:id", asyncHandler(roomController.getRoomByHotel));

roomRouter.get("/bed",asyncHandler(roomController.getBedType));

roomRouter.get("/view", asyncHandler(roomController.getViewType));

roomRouter.get("/:id", asyncHandler(roomController.getRoomById));

roomRouter.get("/img/:id", asyncHandler(roomController.getRoomImgUrl));

roomRouter.post(
    "/reg",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => roomController.regRoom(req as JWTCheck, res)),
);

roomRouter.put(
    "/info",
    isAuthenticated,
    uploadRoomImg.array("images", 6),
    asyncHandler((req: Request, res: Response) => roomController.putRoomInfo(req as JWTCheck, res)),
)

roomRouter.post(
    "/price/month",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => roomController.insertPriceByMonth(req as JWTCheck, res)),
);

roomRouter.get("/price/:id", asyncHandler(roomController.getPriceByRoom));

export default roomRouter