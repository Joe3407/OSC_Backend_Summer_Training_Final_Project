import {Request, Response, NextFunction} from 'express';
import {AuthRequest} from './authenticate.middleware';
//---------------------------------------------------------------------------------

export const authorizeTrainer = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = "Trainer";
    if (req.user!.role !== userRole) {
        return res.status(403).json({ message: "Access denied. You are not authorized to perform this action." });
    }
    next();
}