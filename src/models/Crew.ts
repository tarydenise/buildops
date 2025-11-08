import mongoose, { Schema, Document } from "mongoose";

export interface ICrew extends Document {
    name: string;
    foreman: string;
    members: string[];
    specialty?: string;
    startDate?: Date;
    active: boolean;
    notes?: string;
}

const CrewSchema: Schema = new Schema({
    name: { type: String, required: true },
    foreman: { type: String, required: true },
    members: { type: [String], required: true },
    specialty: { type: String },
    startDate: { type: Date },
    active: { type: Boolean, required: true },
    notes: { type: String },
});

export default mongoose.model<ICrew>('Crew', CrewSchema);