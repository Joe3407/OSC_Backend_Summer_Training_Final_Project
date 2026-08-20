import {Request , Response, NextFunction} from 'express';
  

export const ValidateData = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    if(role !== "Member" && role !== "Trainer") {
        return res.status(400).json({ message: "Invalid role. Role must be either 'Member' or 'Trainer'" });
    }
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string" || typeof role !== "string") {
        return res.status(400).json({ message: "Values entered are not correctly formatted. All fields must be strings" });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long --extra tip : try including special characters :)    )" });
    }
    next();
}
