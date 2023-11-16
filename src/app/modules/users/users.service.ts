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

//get single user
const getSingleUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findById(id)
    return result
  }

// Delete user
const deleteUser = async (id: string): Promise<IUser | null> => {
    const isExist = await User.findById(id)
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
    }
    const result = await User.findByIdAndDelete(id)
    return result
  }

export const UserService = {
    createUser,
    getSingleUser,
    deleteUser
}