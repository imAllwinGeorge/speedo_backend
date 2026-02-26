import type { IBaseRepository } from "./base-repository.interface";
import { type User, UserModel } from "../../models/user.model";

export interface IUserRepository extends IBaseRepository<User> {

}