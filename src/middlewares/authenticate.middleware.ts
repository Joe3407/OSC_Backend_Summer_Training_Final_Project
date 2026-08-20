import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
    user?: { id: string; role: "Member" | "Trainer" };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token =req.cookies?.token;
    if(!token) {
        return res.status(401).json("Token is missing");
    }
    try{
            const TokenIsValid= jwt.verify(token , process.env.JWT_SECRET  as string) as {
                id : string,
                role : "Member" | "Trainer"
            }
            
            req.user = TokenIsValid;
            next();

    }
    catch{
        return res.status(401).json("Token is invalid");
    } 
}
