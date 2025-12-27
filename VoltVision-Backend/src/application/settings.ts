import { Request, Response, NextFunction } from 'express';
import { SystemSettings } from '../infrastructure/entities/SystemSettings';

// GET Settings
export const getSystemSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find the first settings document, or create one if missing
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = await SystemSettings.create({});
    }
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

// UPDATE Settings
export const updateSystemSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { appName, maintenanceMode, emailNotifications, logRetentionDays } = req.body;
    
    // Update the single settings document (upsert ensures it exists)
    const settings = await SystemSettings.findOneAndUpdate(
      {}, // empty filter matches the first document
      { appName, maintenanceMode, emailNotifications, logRetentionDays },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};