import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IUser } from "./users.interface";
import { User } from "./users.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
    if(!user.email) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
    }
    const result = await User.create(user);
    return result;
}

export const UserService = {
    createUser
}