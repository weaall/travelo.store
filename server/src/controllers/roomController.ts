import { Response, Request } from "express"
import { JWTCheck } from "../interface/interfaces"
import roomService from "../services/roomService";

const roomController = {
    async getRoomByHotel(req: Request, res: Response){
        const data = await roomService.getRoomByHotel(req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },
    async getRoomById(req: Request, res: Response){
        const data = await roomService.getRoomById(req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },
    async getBedType(req: Request, res: Response){
        const data = await roomService.getBedType();

        res.status(200).json({
            error: null,
            data: data,
        });
    },
    async getViewType(req: Request, res: Response){
        const data = await roomService.getViewType();

        res.status(200).json({
            error: null,
            data: data,
        });
    },
    async getRoomImgUrl(req: Request, res: Response){
        const data = await roomService.getRoomImgUrl(req.params.id);

        res.status(200).json({
            error: null,
            data: data,
        });
    },
    async regRoom(req: JWTCheck, res: Response) {
        const data = await roomService.regRoom(req.user.id, req.body);

        res.status(201).json({
            error: null,
            data: data,
        })
    },
    async putRoomInfo(req: JWTCheck, res: Response) {
        console.log(req.user.id)
        console.log(req.body.data)
        console.log(req.files)
        const urls = (req.files as any[]).map((file) => file.location)

        const data = await roomService.putRoomInfo(req.user.id, JSON.parse(req.body.data), urls)

        res.status(201).json({
            error: null,
            data: data,
        })
    },

}
export default roomController
