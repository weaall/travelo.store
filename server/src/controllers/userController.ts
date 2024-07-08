import { JWTCheck } from "../interface/interfaces";
import { Request, Response } from "express";
import userService from "../services/userService";

const userController = {
    async me(req: JWTCheck, res: Response) {
        const user = await userService.me(req.user.id);

        res.status(200).json({
            error: null,
            data: user,
        });
    },

    async getNameByUserId(req: Request, res: Response) {
        const user = await userService.getNameByUserId(req.params.id);

        res.status(200).json({
            error: null,
            data: user,
        });
    },
};
export default userController;
