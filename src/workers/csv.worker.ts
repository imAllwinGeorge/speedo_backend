import { parentPort, workerData } from "node:worker_threads";
import fs from 'fs'
import csv from 'csv-parser'
import { TripRepository } from "../repositories/trip-repository";
import type { TripPoints } from "../models/trip.model";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      dbName: process.env.DB_NAME,
    });

    const { userId, name, filePath } = workerData;
    const results: TripPoints[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          latitude: row.latitude,
          longitude: row.longitude,
          timestamp: row.timestamp,
          ignition: row.ignition === "on",
        });
      })
      .on("end", async () => {
        try {
          const repo = new TripRepository();
          await repo.save({ userId, name, tripDetails: results });
          parentPort?.postMessage({ status: "success", count: results.length });
        } catch (error) {
          parentPort?.postMessage({ status: "error", error });
        } finally {
          fs.unlink(filePath, () => {});
          mongoose.disconnect();
        }
      });
  } catch (err) {
    parentPort?.postMessage({ status: "error", error: err });
  }
})();
