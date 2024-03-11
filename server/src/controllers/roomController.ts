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

}
export default roomController
