import { Request, Response } from "express";
import authService from "../services/authService";
import { presignedUrl } from "../config/presignedUrl";
import axios from 'axios';

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
            console.error(error);
            res.status(500).send("Error exchanging code for token");
        }
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
