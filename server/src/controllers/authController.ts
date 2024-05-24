import { Request, Response } from "express";
import authService from "../services/authService";
import { presignedUrl } from "../config/presignedUrl";

const authController = {
    async signUp(req: Request, res: Response) {
        const data = await authService.singUp(req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },

    async signIn(req: Request, res: Response) {
        const data = await authService.singIn(req.body);

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

    async presignedUrl(req: Request, res: Response) {
        const { key, contentType } = req.body;

        try {
            const signedUrl = await presignedUrl(key, contentType);

            if (signedUrl) {
                return res.status(201).json({
                    error: null,
                    data: signedUrl,
                });
            } else {
                return res.status(500).json({
                    error: "Failed to generate presigned URL",
                });
            }
        } catch (error) {
            return error;
        }
    },
};

export default authController;
