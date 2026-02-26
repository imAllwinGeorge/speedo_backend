import { NextFunction, Request, Response } from "express";

export interface ITripController {
    upload(req: Request, res: Response, next: NextFunction): Promise<void>;
    fetchTrips(req: Request, res: Response, next: NextFunction): Promise<void>;
}