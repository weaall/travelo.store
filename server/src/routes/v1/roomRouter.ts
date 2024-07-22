import { Router, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import roomController from "../../controllers/roomController";
import { JWTCheck } from "../../interface/interfaces";
import isAuthenticated from "../../middlewares/isAuthenticated";
import { roomValidator } from "../../middlewares/validator/roomValidator";
import { validateError } from "../../middlewares/validator/validateError";

const roomRouter = Router();

roomRouter.get("/hotel/:id", roomValidator.getRoomByHotel, validateError, asyncHandler(roomController.getRoomByHotel));

roomRouter.get("/bed", asyncHandler(roomController.getBedType));

roomRouter.get("/view", asyncHandler(roomController.getViewType));

roomRouter.get("/:id", roomValidator.getRoomById, validateError, asyncHandler(roomController.getRoomById));

roomRouter.get("/img/:id", roomValidator.getRoomImgUrl, validateError, asyncHandler(roomController.getRoomImgUrl));

roomRouter.post(
    "/reg",
    roomValidator.regRoom,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => roomController.regRoom(req as JWTCheck, res)),
);

roomRouter.put(
    "/info",
    roomValidator.putRoomInfo,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => roomController.putRoomInfo(req as JWTCheck, res)),
);

roomRouter.post(
    "/price/date",
    roomValidator.insertPriceByDate,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => roomController.insertPriceByDate(req as JWTCheck, res)),
);

roomRouter.post(
    "/price/month",
    roomValidator.insertPriceByMonth,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => roomController.insertPriceByMonth(req as JWTCheck, res)),
);

roomRouter.get("/price/:id", roomValidator.getPriceByRoomId, validateError, asyncHandler(roomController.getPriceByRoomId));

export default roomRouter;
