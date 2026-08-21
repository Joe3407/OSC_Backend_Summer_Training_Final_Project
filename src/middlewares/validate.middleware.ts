import {Request , Response, NextFunction} from 'express';
import mongoose from 'mongoose';
//---------------------------------------------------------------------------------

export const ValidateData = (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    if (typeof fullName !== "string" || typeof email !== "string" || typeof password !== "string" || typeof role !== "string") {
        return res.status(400).json({ message: "Values entered are not correctly formatted. All fields must be strings" });
    }
    if(role !== "Member" && role !== "Trainer") {
        return res.status(400).json({ message: "Invalid role. Role must be either 'Member' or 'Trainer'" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long --extra tip : try including special characters :)    )" });
    }
    next();
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const ValidateClassSessionData = (req: Request, res: Response, next: NextFunction) => {
    const { title, trainer, timeSlot, capacity } = req.body;

    if (!title || !trainer || !timeSlot || capacity === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (typeof title !== "string" || title.trim().length === 0) { 
        return res.status(400).json({ message: "Title must be a non-empty string" });
    }

    if (!mongoose.Types.ObjectId.isValid(trainer)) {
        return res.status(400).json({ message: "Invalid trainer id" });
    }

    const date = new Date(timeSlot);
    if (isNaN(date.getTime())) {
        return res.status(400).json({ message: "Invalid timeSlot date format" });
    }
    if (date <= new Date()) {
        return res.status(400).json({ message: "timeSlot must be in the future" });
    }

    if (typeof capacity !== "number" || !Number.isInteger(capacity) || capacity < 1) {
        return res.status(400).json({ message: "Capacity must be a positive integer" });
    }

    next();
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const ValidateBookingData = (req: Request, res: Response, next: NextFunction) => {
    const { session, member } = req.body;

    if (!session || !member) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    if(!mongoose.Types.ObjectId.isValid(session) || !mongoose.Types.ObjectId.isValid(member)) {
        return res.status(400).json({ message: "Invalid session or member id" });
    }
    next();
}