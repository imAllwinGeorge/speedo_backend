import type { IUserRepository } from "../interfaces/repositories/user-repository.interface";
import {type User, UserModel} from "../models/user.model"
import { BaseRepository } from "./base-repository";

export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor() {
        super(UserModel)
    }
}