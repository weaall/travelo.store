import { Request, Response } from "express";
import pool from "../config/db";

const deptController = {
    /*조회**/
    getDepts(req: Request, res: Response) {
        console.log("부서 조회");
        pool.query("Select * from hotel", function (err, results, fields) {
            if (err) throw err;
            res.send(results);
            pool.releaseConnection;
            console.log(fields);
        });
    },
};

export default deptController;
