import mongoose, { Schema, Document} from "mongoose";

export interface IJobSite extends Document {
    location: string;
    client: string;
    budget: number;
    deadline?: Date;
    status?: string;
    crewAssigned?: mongoose.Types.ObjectId;
    notes?: string;
}

const JobSiteSchema: Schema = new Schema({
    location: { type: String, required: true },
    client: { type: String, required: true },
    budget: { type: Number, required: true },
    deadline: { type: Date },
    status: { type: String },
    CrewAssigned: { type: Schema.Types.ObjectId, ref: 'Crew' },
    notes: { type: String },
});

export default mongoose.model<IJobSite>('JobSite', JobSiteSchema);