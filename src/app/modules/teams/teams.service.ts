import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IUser } from "../users/users.interface";
import { User } from "../users/users.model";
import { ITeam } from "./teams.interface";
import mongoose, { ClientSession } from 'mongoose'
import { Team, UserTeam } from "./teams.model";

const createTeam = async (data: ITeam): Promise<ITeam> => {
    const session: ClientSession = await mongoose.startSession()
  session.startTransaction()
  try {
    const userData = await User.findById(data.teamMember).session(session);
    if(!userData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
    }
    const teamUser = await Team.findOne({teamMember: data.teamMember}).session(session);

    // if(userData === data.teamMember){
    //   throw new ApiError(httpStatus.FOUND, 'User already Added !')
    // }
    const insertTeam = await Team.create(data);
    await session.commitTransaction();
    session.endSession();
    return insertTeam;
  } catch (error:any) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

export const teamService = {
  createTeam
}