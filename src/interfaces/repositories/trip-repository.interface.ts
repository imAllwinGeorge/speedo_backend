import type { Trip } from "../../models/trip.model";
import type { IBaseRepository } from "./base-repository.interface";

export interface ITripRepository extends IBaseRepository<Trip> {
}