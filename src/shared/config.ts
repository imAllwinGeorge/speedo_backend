import dotenv from 'dotenv';
dotenv.config()



export const config = {
    PORT: process.env.PORT,
    CORS: {
        ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN
    },
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
}