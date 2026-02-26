import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from './shared/config';
import { TripRoutes } from './routes/trip-route';
import { AuthRoutes } from './routes/auth-route';
const app = express();


const authRoutes = new AuthRoutes()
const tripRoutes = new TripRoutes()

app.set("trust proxy", 1)

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())




app.use(cors({
    origin: config.CORS.ALLOWED_ORIGIN,
    credentials: true
}))

app.use("/api", authRoutes.router)
app.use("/api/trip", tripRoutes.router)

export default app