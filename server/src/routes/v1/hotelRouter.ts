import { Router, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import hotelController from "../../controllers/hotelController";
import { JWTCheck } from "../../interface/interfaces";
import isAuthenticated from "../../middlewares/isAuthenticated";
import { hotelValidator } from "../../middlewares/validator/hotelValidator";
import { validateError } from "../../middlewares/validator/validateError";

const hotelRouter = Router();

hotelRouter.get("/", asyncHandler(hotelController.getHotel));

hotelRouter.get("/img/:id", hotelValidator.getHotelImgUrlById, validateError, asyncHandler(hotelController.getHotelImgUrl));

hotelRouter.get(
    "/me",
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.getMyHotel(req as JWTCheck, res)),
);

hotelRouter.post(
    "/reg",
    hotelValidator.regHotel,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.regHotel(req as JWTCheck, res)),
);

hotelRouter.get("/:id", hotelValidator.getHotelById, validateError, asyncHandler(hotelController.getHotelById));

hotelRouter.get(
    "/mgmt/info/:id",
    hotelValidator.getHotelInfoById,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.getHotelInfoById(req as JWTCheck, res)),
);

hotelRouter.put(
    "/mgmt/info",
    hotelValidator.putHotelInfo,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.putHotelInfo(req as JWTCheck, res)),
);

hotelRouter.put(
    "/mgmt/serv",
    hotelValidator.putHotelServ,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.putHotelServ(req as JWTCheck, res)),
);

hotelRouter.put(
    "/mgmt/facil",
    hotelValidator.putHotelFacil,
    validateError,
    isAuthenticated,
    asyncHandler((req: Request, res: Response) => hotelController.putHotelFacil(req as JWTCheck, res)),
);

export default hotelRouter;
