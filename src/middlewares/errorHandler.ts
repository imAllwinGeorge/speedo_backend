import type{ ErrorRequestHandler,NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/appError";
import {ZodError} from 'zod';
import { config } from "../shared/config";

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.log("errors", err.stack || err.message);

    if(err instanceof AppError) {
        res.status(err.statusCode).json({success: false, message: err.message});
        return;
    }

    if(err instanceof ZodError) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
        return
    }

    res.status(500).json({
        success: false,
        message:
        config.NODE_ENV === "production"
        ? 'something went wrong. please try again later'
        : err.message
    })
}