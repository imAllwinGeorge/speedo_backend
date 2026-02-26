import app from "./app";
import { connectDB } from "./configs/database";
import { config } from "./shared/config";



connectDB()

app.listen(config.PORT)