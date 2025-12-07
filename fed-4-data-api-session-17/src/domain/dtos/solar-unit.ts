import { z } from "zod";

export const CreateSolarUnitDto = z.object({
  serialNumber: z.string().min(1),
  installationDate: z.string().min(1),
  capacity: z.number(),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]),
});

export const UpdateSolarUnitDto = z.object({
  serialNumber: z.string().min(1),
  installationDate: z.string().min(1),
  capacity: z.number(),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]),
  userId: z.string().min(1),
});

export const GetAllEnergyGenerationRecordsQueryDto = z.object({
  groupBy: z.enum(["date"]).optional(),
  limit: z.string().min(1),
});