import { clerkClient, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../domain/errors/errors";

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const auth = getAuth(req);
    if (!auth.userId) {
        throw new UnauthorizedError("Unauthorized");
    }
    next();
};