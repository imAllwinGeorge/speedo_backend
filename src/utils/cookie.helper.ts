import type { Response } from "express";
import { config } from "../shared/config";


export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  const isProd = config.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,                 // MUST be true in prod
    sameSite: isProd ? "none" : "lax",
    maxAge: 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};


export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", {
    sameSite: "none",
    secure: true,
  });
  res.clearCookie("refreshToken", {
    sameSite: "none",
    secure: true,
  });
};
