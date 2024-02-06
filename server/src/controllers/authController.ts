import { Request, Response } from "express";
import authService from "../services/authService";

const authController = {
    async signInKakao(req: Request, res: Response) {
        const token = await authService.kakaoSignIn(req.body.id);


        res.status(201).json({
            error: null,
            data: token,
        });
    },
};

export default authController;
