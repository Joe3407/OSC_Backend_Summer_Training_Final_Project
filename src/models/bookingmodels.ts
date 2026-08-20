import mongoose, { Schema, Document } from "mongoose";

export interface Booking extends Document {
    session: mongoose.Types.ObjectId;
    member: mongoose.Types.ObjectId;
    status: "booked" | "cancelled";
}

const bookingSchema = new Schema<Booking>({
    session: {
        type: Schema.Types.ObjectId,
        ref: "ClassSession",
        required: true
    },

    member: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: ["booked", "cancelled"],
        default: "booked"
    }
});

export const Booking =
    mongoose.model<Booking>("Booking", bookingSchema);