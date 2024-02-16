import { JWTCheck } from "../interface/interfaces";
import { Response } from "express";
import userService from "../services/userService";

const userController = {
    async me(req: JWTCheck, res: Response) {
        console.log(req.user)
        const user = await userService.me(req.user.id);

        res.status(200).json({
            error: null,
            data: user,
        });
    },
};
export default userController;
