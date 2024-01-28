import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express-serve-static-core";

const asyncHandler = (requestHandler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
