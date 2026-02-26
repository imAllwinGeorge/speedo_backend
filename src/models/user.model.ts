import { model, Schema } from "mongoose";


export interface User extends Document {
    _id: any;
    email: string;
    password: string;
    isBlocked: string;
    createdAt: Date;
    updatedAt: Date;
}
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

export const UserModel = model<User>("User", userSchema)