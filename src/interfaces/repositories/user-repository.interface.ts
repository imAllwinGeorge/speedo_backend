import { IBaseRepository } from "./base-repository.interface";
import { User, UserModel } from "../../models/user.model";

export interface IUserRepository extends IBaseRepository<User> {

}