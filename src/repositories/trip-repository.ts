import { ITripRepository } from "../interfaces/repositories/trip-repository.interface";
import { Trip, TripModel } from "../models/trip.model";
import { BaseRepository } from "./base-repository";

export class TripRepository extends BaseRepository<Trip> implements ITripRepository {
    constructor () {
        super(TripModel)
    }

}