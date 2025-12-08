import { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { User } from "../../infrastructure/entities/User";
import { ForbiddenError, UnauthorizedError } from "../../domain/errors/errors";
import { UserPublicMetadata } from "../../domain/types";

export const authorizationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const auth = getAuth(req);
    if (!auth.userId) {
        throw new UnauthorizedError("Unauthorized");
    }

    const publicMetadata = auth.sessionClaims?.metadata as UserPublicMetadata;

    if (publicMetadata.role !== "admin") {
        throw new ForbiddenError("Forbidden");
    }
    next();
};