import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/appError";
import { HttpStatusCode } from "../shared/constants/constants";
import { ITripController } from "../interfaces/controllers/trip-controller.interface";
import { TripServices } from "../services/trip-services";
import {Multer} from 'multer'

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}



export class TripContrller implements ITripController {
  constructor(private _tripServices: TripServices) {}

  async upload(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, name } = req.body;
      const filePath = req.file?.path as string;

      if (!filePath) {
        new AppError("CSV file is required ", HttpStatusCode.BAD_REQUEST);
      }

      await this._tripServices.upload(filePath, userId, name);

      res.status(HttpStatusCode.CREATED).json({ message: "file updated!" });
    } catch (error) {
      next(error);
    }
  }

  async fetchTrips(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {accessToken} = req.cookies
      const trips = await this._tripServices.fetchTrips(accessToken as string)

      res.status(HttpStatusCode.OK).json({trips})
    } catch (error) {
      next(error)
    }
  }
}
