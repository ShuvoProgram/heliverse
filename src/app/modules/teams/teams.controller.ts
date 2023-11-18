import catchAsync from "../../../interface/catchAsync"
import { Request, Response } from "express"
import { teamService } from "./teams.service"
import sendResponse from "../../../shared/sendResponse"
import { ITeam } from "./teams.interface"
import httpStatus from "http-status"

//Create Order
const createTeam = catchAsync(async (req: Request, res: Response) => {
    const { ...userData } = req.body
    const result = await teamService.createTeam(userData)
    sendResponse<ITeam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team created successfully',
      data: result,
    })
  })

export const teamController = {
    createTeam
}