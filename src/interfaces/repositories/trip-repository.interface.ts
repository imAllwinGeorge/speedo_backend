import { Trip } from "../../models/trip.model";
import { IBaseRepository } from "./base-repository.interface";

export interface ITripRepository extends IBaseRepository<Trip> {
}