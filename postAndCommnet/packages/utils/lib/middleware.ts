import { Request, Response, NextFunction } from "express";

export const cors = () => (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};
