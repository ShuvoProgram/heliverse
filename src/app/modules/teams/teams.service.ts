import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { User } from "../users/users.model";
import { ITeam } from "./teams.interface";
import mongoose, { ClientSession } from 'mongoose';
import { Team } from "./teams.model";

const createTeam = async (data: ITeam): Promise<ITeam> => {
  const session: ClientSession = await mongoose.startSession();

  try {
    session.startTransaction();

    const userData = await User.findById(data.teamMember).session(session);
    if (!userData || userData.available === false) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'One or more users are not eligible or unavailable!');
    }

    // Fetch existing team members' domains
    const existingTeamDomains = await Team.findOne({ teamMember: { $in: data.teamMember } })
      .populate('teamMember')
      .session(session);


    const existingTeamMember = await User.findById({ _id: new mongoose.Types.ObjectId(existingTeamDomains?.teamMember[0]?._id) })

    if (existingTeamMember) {
      if (existingTeamMember.domain === userData.domain) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Team Member with Same Domain Already Exists!');
      }
    }

    const insertTeam = await Team.create(data);
    await session.commitTransaction();
    return insertTeam;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllTeam = async (): Promise<ITeam[] | null> => {
  const result = await Team.find({})
  return result
}

export const teamService = {
  createTeam,
  getAllTeam
};
