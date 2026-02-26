import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "./base-route";
import { authController } from "../configs/container";

export class AuthRoutes extends BaseRoute {
    constructor () {
        super()
    }

    protected initializeRoutes(): void {

        this.router.post("/register", (req: Request, res: Response, next: NextFunction) => {
            authController.register(req, res, next);
        })

        this.router.post("/login", (req: Request, res: Response, next: NextFunction) => {
            authController.login(req, res, next);
        })

        this.router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
            authController.logout(req, res, next);
        })
    }
}