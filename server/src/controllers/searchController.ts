import { Response, Request } from "express"
import searchService from "../services/searchService";

const searchController = {
    async getSearch(req: Request, res: Response) {
        const searchValue: string = req.params.searchValue;
        const startDate = req.params.startValue;
        const endDate = req.params.endDate;
        const adult: string = req.params.adult;
        const child: string = req.params.child;

        const data = await searchService.getSearchHotel({searchValue, adult, child});

        res.status(201).json({
            error: null,
            data: data,
        });
    },
};