import { Request, Response } from "express";
import pool from "../config/db";
import authService from "../services/authService";

const authController = {
    signUpKakao(req: Request, res: Response) {
        console.log("카카오 로그인");
        pool.query("Select * from hotel", function (err, results, fields) {
            if (err) throw err;
            res.send(results);
            pool.releaseConnection;
        });
    },

    async authSignIn(req: Request, res: Response) {
        const token = await authService.signIn(req.body);
    
        res.status(201).json({
          error: null,
          data: token,
        });
      },
};


export default authController;
