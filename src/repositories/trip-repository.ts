import type { ITripRepository } from "../interfaces/repositories/trip-repository.interface";
import {type Trip, TripModel } from "../models/trip.model";
import { BaseRepository } from "./base-repository";

export class TripRepository extends BaseRepository<Trip> implements ITripRepository {
    constructor () {
        super(TripModel)
    }

}