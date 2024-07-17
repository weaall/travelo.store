import { Request, Response } from "express";
import authService from "../services/authService";
import { presignedUrl } from "../config/presignedUrl";
import axios from 'axios';
import CustomError from "../utils/customError";

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

    async signInByKakao(req: Request, res: Response) {
        const token = await authService.signInByKakao(req.body.id);

        res.status(201).json({
            error: null,
            data: token,
        });
    },

    async signInByNaver(req: Request, res: Response) {
        const { token } = req.body;

        const response = await axios.get("https://openapi.naver.com/v1/nid/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const jwtToken = await authService.signInByNaver(response.data.response);

        res.status(201).json({
            error: null,
            data: jwtToken,
        });
    },

    async signInByNaverCallback(req: Request, res: Response) {
        const { code, state } = req.body;

        try {
            const response = await axios.post(`https://nid.naver.com/oauth2.0/token`, null, {
                params: {
                    grant_type: "authorization_code",
                    client_id: process.env.NAVER_CLIENT_ID!,
                    client_secret: process.env.NAVER_CLIENT_SECRET!,
                    redirect_uri: process.env.NAVER_REDIRECT_URI!,
                    code,
                    state,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            });

            const { access_token } = response.data;
            res.json({ access_token });
        } catch (error) {
            throw new CustomError("INTERNAL_SERVER_ERROR", 500);
        }
    },

    async presignedUrl(req: Request, res: Response) {
        const { key, contentType } = req.body;

        console.log(req.body)
        try {
            const signedUrl = await presignedUrl(key, contentType);

            if (signedUrl) {
                return res.status(201).json({
                    error: null,
                    data: signedUrl,
                });
            } else {
                throw new CustomError("INTERNAL_SERVER_ERROR", 500);
            }
        } catch (error) {
            throw error;
        }
    },
};

export default authController;
