import { Model } from "mongoose";

// User interface
export type IUser = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    avatar: string;
    domain: string;
    available: boolean;
}

// The IUserModel interface combines the Model interface with custom methods
export type IUserModel = Model<IUser> & {
    // Method to check if a user exists by email
    isUserExit(email: string): Promise<Pick<IUser, '_id' | 'first_name' | 'email' | 'available' | 'domain'>>;
}