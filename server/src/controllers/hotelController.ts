import { Request, Response } from "express";
import hotelService from "../services/hotelService";

const hotelController = {
    async regHotel(req: Request, res: Response){

        const s3FileUrl = (req.file as any).location

        const data = await hotelService.regHotel(req.body);

        res.status(201).json({
            error: null,
            data: data,
        });
    },
};

export default hotelController;


app.post("/api/v1/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
        const s3FileUrl = (req.file as any).location

        const [result] = await pool.execute("INSERT INTO region (name) VALUES (?)", [s3FileUrl])

        res.status(200).json({ success: true, fileId: result })
    } catch (error) {
        console.error("파일 업로드 중 오류:", error)
        res.status(500).json({ success: false, error: "내부 서버 오류" })
    }
})