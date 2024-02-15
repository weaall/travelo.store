import { Request, Response } from "express";
import hotelService from "../services/hotelService";

const hotelController = {
    async regHotel(req: Request, res: Response){

        const s3FileUrl = (req.file as Express.Multer.File).buffer;

        const data = await hotelService.regHotel(req.body, s3FileUrl.toString());

        res.status(201).json({
            error: null,
            data: data,
        });
    },
};

export default hotelController;
