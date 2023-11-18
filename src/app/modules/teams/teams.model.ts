import { Schema, model } from "mongoose";
import { ITeam, TeamModel } from "./teams.interface";

// team Schema
export const UserTeam = new Schema<ITeam, TeamModel>(
  {
    teamMember: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Team Model
export const Team = model<ITeam, TeamModel>("Team", UserTeam);