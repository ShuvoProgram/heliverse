import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IUser, IUserFilters } from "./users.interface";
import { User } from "./users.model";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../helper/paginationHelper";
import { userSearchableFields } from "./users.constants";
import { SortOrder } from "mongoose";

const createUser = async (user: IUser): Promise<IUser | null> => {
    if(!user.email) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
    }
    const result = await User.create(user);
    return result;
}

const getAllUser = async (
  filterCriteria: IUserFilters,
  paginationOptions: IPaginationOptions,
  ): Promise<IGenericResponse<IUser[]>> => {
  const { query, domain, gender, available, ...filtersData } = filterCriteria;
  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

   const filterConditions = [];
   
  if (query) {
    const queryConditions = userSearchableFields.map((field) => ({ [field]: { $regex: query, $options: 'i' } }));
    filterConditions.push({ $or: queryConditions });
  }
  // Check if any of the domain, gender, or available criteria is present
  if (domain || gender || available !== undefined) {
    if (domain) filterConditions.push({ domain });
    if (gender) filterConditions.push({ gender });
    if (available !== undefined) filterConditions.push({ available });
  }
 
  if (Object.keys(filtersData).length) {
    const additionalFilters = Object.entries(filtersData).map(([field, value]) => ({ [field]: value }));
    filterConditions.push({ $and: additionalFilters });
  }

  const whereConditions = filterConditions.length > 0 ? { $and: filterConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
 

  const result = await User.find(whereConditions)
  .sort(sortConditions)
  .skip(skip)
  .limit(limit)

const total = await User.countDocuments(whereConditions)


return {
  meta: {
    page,
    limit,
    total,
  },
  data: result,
}
}

//get single user
const getSingleUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findById(id)
    return result
  }

  const updateUser = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
    // const isExist = await User.findOne({id});

    // if (!isExist) {
    //     throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
    //   }
    const result = await User.findOneAndUpdate(
        {_id: id},
        payload,
        {
            new: true
        }
    );
    return result;
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
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}