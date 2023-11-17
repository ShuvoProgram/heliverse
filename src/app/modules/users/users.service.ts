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

   // Check if any of the domain, gender, or available criteria is present
   const hasFilterCriteria = domain || gender || available;


  const andConditions = []
  if (query) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: query,
          $options: 'i',
        },
      })),
    })
  }
  if (hasFilterCriteria || Object.keys(filtersData).length) {
    // Only add filter conditions if any of domain, gender, or available is present
    const filterConditions = [];
    if (domain) {
      filterConditions.push({ domain });
    }
    if (gender) {
      filterConditions.push({ gender });
    }
    if (available !== undefined) {
      filterConditions.push({ available });
    }

    andConditions.push({
      $or: filterConditions,
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
 

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
  andConditions.length > 0 ? { $and: andConditions } : {}

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