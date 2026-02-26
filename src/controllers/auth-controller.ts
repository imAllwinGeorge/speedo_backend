import { NextFunction, Request, Response } from "express";
import { IAuthController } from "../interfaces/controllers/authController.interface";
import { HttpStatusCode } from "../shared/constants/constants";
import { AuthServices } from "../services/auth-services";
import { clearAuthCookies, setAuthCookies } from "../utils/cookie.helper";

export class AuthController implements IAuthController {
    constructor (
        private _authServices: AuthServices
    ) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email, password} = req.body;

            const result = await this._authServices.register(email, password);

            setAuthCookies(res, result.accessToken, result.refreshToken);

            res.status(HttpStatusCode.CREATED).json({user: result.newUser})
            
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email, password} = req.body;

            const result = await this._authServices.login(email, password);

            setAuthCookies(res, result.accessToken, result.refreshToken);

            res.status(HttpStatusCode.OK).json({user: result.user})
        } catch (error) {
            next(error)
        }
    }

    async logout (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            clearAuthCookies(res);

            res.status(HttpStatusCode.OK).json({success: true})
        } catch (error) {
            next(error)
        }
    }
}