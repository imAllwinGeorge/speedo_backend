import type { NextFunction, Request, Response } from "express";
import path, { dirname } from "node:path";
import { Worker } from "node:worker_threads";
import { AppError } from "../shared/errors/appError";
import { HttpStatusCode } from "../shared/constants/constants";
import { JwtServices } from "./jwt-services";
import { TripRepository } from "../repositories/trip-repository";
import { fileURLToPath } from "node:url";

export class TripServices {
  constructor(
    private _jwtServices: JwtServices,

    private _tripRepository: TripRepository,
  ) {}

  async upload(filePath: string, userId: string, name: string) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return new Promise<void>((resolve, reject) => {
      const worker = new Worker(
        path.resolve(__dirname, "../workers/csv.worker.js"),
        {
          workerData: { filePath, userId, name },
          execArgv: ["-r", "tsx"],
        },
      );

      worker.on("message", (msg) => {
        console.log("Worker finished: ", msg);
        resolve();
      });

      worker.on("error", (err) => {
        console.error("worker error: ", err);
        reject(err);
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(
            new AppError(
              `worker stopped with exit code ${code}`,
              HttpStatusCode.INTERNAL_SERVER_ERROR,
            ),
          );
        }
      });
    });
  }

  async fetchTrips(accessToken: string) {
    const payload = this._jwtServices.decodeToken(accessToken);
    console.log(accessToken, payload);
    const trips = await this._tripRepository.find({ userId: payload.userId });

    return trips;
  }
}
