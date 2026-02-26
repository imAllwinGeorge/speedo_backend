import { type InferSchemaType, model, Schema } from "mongoose";

export interface TripPoints {
    latitude: number;
    longitude: number;
    timestamp: Date;
    ignition: boolean;
}

export interface Trip extends Document {
    userId: string;
    name: string;
    tripDetails: TripPoints[];
    createdAt: Date;
    updatedAt: Date;
}

const tripSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        requited: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    tripDetails: [
        {
            latitude: Number,
            longitude: Number,
            timestamp: Date,
            ignition: Boolean,
        }
    ],
}, {
    timestamps: true
});



export const TripModel = model<Trip>("Trip", tripSchema);