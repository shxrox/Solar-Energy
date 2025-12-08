import { NextFunction, Request, Response } from "express";
import { User } from "../infrastructure/entities/User";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };