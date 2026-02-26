import type { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../shared/constants/constants";
import { authServices } from "../configs/container";


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("verify token");
        const token = req.cookies.accessToken
        console.log(token)
        const user = await authServices.verifyToken(token);
        console.log(token, user)
        if(user.isBlocked) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({message: " you have been blocked please contact admin"});
            return;
        }

        next();
    } catch (error) {
        if(error instanceof Error) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({message: "session expired"});
        }
    }
} 