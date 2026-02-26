import { AuthController } from "../controllers/auth-controller";
import { TripContrller } from "../controllers/trip-controller";
import { TripRepository } from "../repositories/trip-repository";
import { UserRepository } from "../repositories/user.repository";
import { AuthServices } from "../services/auth-services";
import { JwtServices } from "../services/jwt-services";
import { TripServices } from "../services/trip-services";
import { config } from "../shared/config";

const userRepository = new UserRepository();

const tripRepository = new TripRepository();

const jwtServices = new JwtServices(config.ACCESS_TOKEN_SECRET!, config.REFRESH_TOKEN_SECRET!);

const tripServices = new TripServices(jwtServices, tripRepository);

export const authServices = new AuthServices(userRepository, jwtServices)

export const tripController = new TripContrller(tripServices);

export const authController = new AuthController(authServices);
