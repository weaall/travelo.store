import { Request, Response } from "express";
import authService from "../services/authService";

const authController = {
    async signUp(req: Request, res: Response){
        console.log(req.body)
        const data = await authService.singUp(req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async signInKakao(req: Request, res: Response) {
        const token = await authService.kakaoSignIn(req.body.id);

        res.status(201).json({
            error: null,
            data: token,
        });
    },
};

export default authController;
