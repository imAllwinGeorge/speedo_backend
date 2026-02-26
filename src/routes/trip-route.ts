import { NextFunction, Request, Response } from "express"
import { upload } from "../configs/multer"
import { BaseRoute } from "./base-route"
import { tripController } from "../configs/container"
import { verifyToken } from "../middlewares/auth-middleware"



export class TripRoutes extends BaseRoute {
    constructor () {
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/upload", verifyToken, upload.single("csv"),(req: Request, res: Response, next: NextFunction) => {
            console.log("request reached...........")
            tripController.upload(req, res, next);
        })

        this.router.get("/get-trips", verifyToken, (req: Request, res: Response, next: NextFunction) => {
            tripController.fetchTrips(req, res, next)
        })
    }
}