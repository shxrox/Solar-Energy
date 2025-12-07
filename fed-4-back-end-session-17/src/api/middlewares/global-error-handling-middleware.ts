import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err.name === "NotFoundError") {
    return res.status(404).json({ message: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: err.message });
  }

  // Handle other errors
  res.status(500).json({ message: "Internal server error" });
};
