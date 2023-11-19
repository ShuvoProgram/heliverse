import { Model, Types } from "mongoose";
import { IUser } from "../users/users.interface";

export type ITeam = {
  teamName: string;
  teamMember: Types.ObjectId[] | IUser[];
};

export type TeamModel = Model<ITeam, Record<string, unknown>>;