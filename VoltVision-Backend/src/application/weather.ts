// import { Request, Response, NextFunction } from "express";

// export const getWeatherData = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Hardcoded coordinates for demo (e.g., Colombo, or use your city)
//     const lat = 6.9271;
//     const lon = 79.8612;

//     const response = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,cloud_cover&daily=sunrise,sunset&timezone=auto`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch weather data");
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

import { Request, Response, NextFunction } from "express";

export const getWeatherData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Hardcoded coordinates (Colombo example)
    const lat = 6.9271;
    const lon = 79.8612;

    // ✅ ADDED: &current=...wind_speed_10m
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,cloud_cover,wind_speed_10m&daily=sunrise,sunset&timezone=auto`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};