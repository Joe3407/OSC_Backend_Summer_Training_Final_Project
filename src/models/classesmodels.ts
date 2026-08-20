import mongoose, { Schema, Document } from "mongoose";

export interface ClassSession extends Document {
    title: string;
    trainer: mongoose.Types.ObjectId;
    timeSlot: Date;
    capacity: number;
}

const classSessionSchema = new Schema<ClassSession>({
    title: {
        type: String,
        required: true
    },

    trainer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    timeSlot: {
        type: Date,
        required: true
    },

    capacity: {
        type: Number,
        required: true,
        min: 1
    }
});

export const ClassSession =
    mongoose.model<ClassSession>("ClassSession", classSessionSchema);