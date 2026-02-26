import { UserRepository } from "../repositories/user.repository";
import { HttpStatusCode } from "../shared/constants/constants";
import { AppError } from "../shared/errors/appError";
import bcrypt from 'bcrypt'
import { JwtServices } from "./jwt-services";


export class AuthServices {
    constructor (
        private _userRepository: UserRepository,
        private _jwtServices: JwtServices
    ) {}

    async register (email: string, password: string) {
        const user = await this._userRepository.findOne({email});

        if(user) {
            throw new AppError("User already exist", HttpStatusCode.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await this._userRepository.save({email, password: hashedPassword})

        if(!newUser) throw new AppError("Internal server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);

        const accessToken = this._jwtServices.singnAccessToken({userId: newUser._id});
        const refreshToken = this._jwtServices.signRefreshToken({userId: newUser._id});

        return {accessToken, refreshToken, newUser}
    }

    async login(email: string, password: string) {
        const user = await this._userRepository.findOne({email});

        if(!user) {
            throw new AppError("User not found", HttpStatusCode.NOT_FOUND);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new AppError("Invalid Credentials", HttpStatusCode.UNAUTHORIZED);
        }

        const accessToken = this._jwtServices.singnAccessToken({userId: user._id});
        const refreshToken = this._jwtServices.signRefreshToken({userId: user._id});

        return {accessToken, refreshToken, user}
    }

    async verifyToken(token: string) {
        const payload = this._jwtServices.verifyAccessToken(token);

        if(!payload) throw new AppError("session Expired", HttpStatusCode.UNAUTHORIZED);

        const user = await this._userRepository.findById(payload.userId.toString());

        if(!user) throw new AppError("Internal Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR);

        return user
    }
}