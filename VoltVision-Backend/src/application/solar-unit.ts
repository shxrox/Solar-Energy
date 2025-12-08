import { z } from "zod";
import { CreateSolarUnitDto, UpdateSolarUnitDto } from "../domain/dtos/solar-unit";
import { SolarUnit } from "../infrastructure/entities/SolarUnit";
import { NextFunction, Request, Response } from "express";
import { NotFoundError, ValidationError } from "../domain/errors/errors";
import { User } from "../infrastructure/entities/User";
import { getAuth } from "@clerk/express";

// 1. Get All Units (Admin use)
export const getAllSolarUnits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const solarUnits = await SolarUnit.find();
    res.status(200).json(solarUnits);
  } catch (error) {
    next(error);
  }
};

// 2. Validator for Creation
export const createSolarUnitValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = CreateSolarUnitDto.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError(result.error.message);
  }
  next();
};

// 3. Create Unit (FIXED: Links to User)
export const createSolarUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // A. Get the authenticated user
    const auth = getAuth(req);
    const user = await User.findOne({ clerkUserId: auth.userId });
    
    if (!user) {
        throw new NotFoundError("User not found during creation");
    }

    const data: z.infer<typeof CreateSolarUnitDto> = req.body;

    // B. Create the object linked to the user
    const newSolarUnit = {
      userId: user._id, // <--- CRITICAL FIX: Links unit to the user
      serialNumber: data.serialNumber,
      installationDate: new Date(data.installationDate),
      capacity: data.capacity,
      status: data.status,
    };

    const createdSolarUnit = await SolarUnit.create(newSolarUnit);
    res.status(201).json(createdSolarUnit);
  } catch (error) {
    next(error);
  }
};

// 4. Get Single Unit by ID
export const getSolarUnitById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const solarUnit = await SolarUnit.findById(id);

    if (!solarUnit) {
      throw new NotFoundError("Solar unit not found");
    }
    res.status(200).json(solarUnit);
  } catch (error) {
    next(error);
  }
};

// 5. Get Unit for Current User (FIXED: Handles no unit gracefully)
export const getSolarUnitForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);
    const user = await User.findOne({ clerkUserId: auth.userId });
    
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Find the unit belonging to this user
    const solarUnit = await SolarUnit.findOne({ userId: user._id });
    
    // If they haven't bought one yet, return null (don't throw error)
    if (!solarUnit) {
        return res.status(200).json(null);
    }
    
    res.status(200).json(solarUnit);
  } catch (error) {
    next(error);
  }
};

// 6. Validator for Update
export const updateSolarUnitValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = UpdateSolarUnitDto.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError(result.error.message);
  }
  next();
};

// 7. Update Unit
export const updateSolarUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { serialNumber, installationDate, capacity, status, userId } = req.body;
    
    const solarUnit = await SolarUnit.findById(id);
    if (!solarUnit) {
      throw new NotFoundError("Solar unit not found");
    }

    const updatedSolarUnit = await SolarUnit.findByIdAndUpdate(id, {
      serialNumber,
      installationDate,
      capacity,
      status,
      userId,
    }, { new: true }); // Returns the updated object

    res.status(200).json(updatedSolarUnit);
  } catch (error) {
      next(error);
  }
};

// 8. Delete Unit
export const deleteSolarUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const solarUnit = await SolarUnit.findById(id);

    if (!solarUnit) {
      throw new NotFoundError("Solar unit not found");
    }

    await SolarUnit.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};