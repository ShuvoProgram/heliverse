import mongoose from "mongoose";
import { IUser, IUserModel } from "./users.interface";

const usersSchema = new mongoose.Schema<IUser, IUserModel>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
},
{
    timestamps: true
  }
)

usersSchema.statics.isUserExist = async function (
    email: string
): Promise<IUser | null> {
    return await User.findOne(
        {email},
        {first_name: 1, email: 1, available: 1, domain: 1}
    )
}

// Create the User model using the schema
export const User = mongoose.model<IUser, IUserModel>('User', usersSchema);