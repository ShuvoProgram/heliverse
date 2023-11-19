import { Schema, model } from "mongoose";
import { ITeam, TeamModel } from "./teams.interface";

// team Schema
export const UserTeam = new Schema<ITeam, TeamModel>(
  {
    teamName: {
      type: String,
      required: true,
    },
    teamMember: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
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