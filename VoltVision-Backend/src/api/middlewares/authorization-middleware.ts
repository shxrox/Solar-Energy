// import { NextFunction, Request, Response } from "express";
// import { getAuth } from "@clerk/express";
// import { User } from "../../infrastructure/entities/User";
// import { ForbiddenError, UnauthorizedError } from "../../domain/errors/errors";
// import { UserPublicMetadata } from "../../domain/types";

// export const authorizationMiddleware = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     const auth = getAuth(req);
//     if (!auth.userId) {
//         throw new UnauthorizedError("Unauthorized");
//     }

//     const publicMetadata = auth.sessionClaims?.metadata as UserPublicMetadata;

//     if (publicMetadata.role !== "admin") {
//         throw new ForbiddenError("Forbidden");
//     }
//     next();
// };

// import { Request, Response, NextFunction } from "express";
// import { getAuth } from "@clerk/express";
// import { ForbiddenError } from "../../domain/errors/errors";

// // This is a "Higher Order Function" that returns the middleware
// export const authorizationMiddleware = (allowedRoles: string[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { sessionClaims } = getAuth(req);
      
//       // Check Clerk metadata for the role (adjust 'role' to match your Clerk setup)
//       const userRole = (sessionClaims?.metadata as { role?: string })?.role;

//       if (!userRole || !allowedRoles.includes(userRole)) {
//         throw new ForbiddenError("You do not have permission to perform this action");
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

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