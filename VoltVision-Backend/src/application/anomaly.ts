import { Request, Response, NextFunction } from "express";
import { Anomaly } from "../infrastructure/entities/Anomaly";
import { SolarUnit } from "../infrastructure/entities/SolarUnit";
import { User } from "../infrastructure/entities/User";
import { getAuth } from "@clerk/express";
import { NotFoundError, ValidationError } from "../domain/errors/errors";

export const getMyAnomalies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = getAuth(req);
        const user = await User.findOne({ clerkUserId: auth.userId });
        if (!user) throw new NotFoundError("User not found");

        const solarUnit = await SolarUnit.findOne({ userId: user._id });
        if (!solarUnit) return res.status(200).json([]);

        const { status, severity } = req.query;
        const filter: any = { solarUnitId: solarUnit._id };
        if (status) filter.status = status;
        if (severity) filter.severity = severity;

        const anomalies = await Anomaly.find(filter).sort({ timestamp: -1 });
        res.status(200).json(anomalies);
    } catch (error) {
        next(error);
    }
};

export const resolveAnomaly = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) throw new ValidationError("Anomaly ID is required");

        const anomaly = await Anomaly.findByIdAndUpdate(id, { status: "RESOLVED" }, { new: true });
        if (!anomaly) throw new NotFoundError("Anomaly not found");

        res.status(200).json(anomaly);
    } catch (error) {
        next(error);
    }
};

export const getAllAnomaliesAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status, severity, type } = req.query;
        const filter: any = {};
        if (status) filter.status = status;
        if (severity) filter.severity = severity;
        if (type) filter.type = type;

        const anomalies = await Anomaly.find(filter)
            .populate({
                path: 'solarUnitId',
                select: 'serialNumber',
                populate: { path: 'userId', select: 'firstName lastName email' }
            })
            .sort({ timestamp: -1 });

        res.status(200).json(anomalies);
    } catch (error) {
        next(error);
    }
};