import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    fullName: string;
    email: string;
    password: string;
    role: "Member" | "Trainer";
}

const userSchema = new Schema<User>({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["Member", "Trainer"],
        required: true
    }
});

export const User = mongoose.model<User>("User", userSchema);