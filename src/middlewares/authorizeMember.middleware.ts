import {Response, NextFunction} from 'express';
import {AuthRequest} from './authenticate.middleware';
//---------------------------------------------------------------------------------

export const authorizeMember = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = "Member";
    if (req.user!.role !== userRole) {
        return res.status(403).json({ message: "Access denied. You are not authorized to perform this action." });
    }
    next();
}