import httpStatus from "http-status"
import catchAsync from "../../../interface/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { IUser } from "./users.interface"
import { UserService } from "./users.service"
import { Request, Response } from "express"

const createUser = catchAsync(async (req: Request, res: Response) => {
    const { ...userData } = req.body
    const result = await UserService.createUser(userData)
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    })
  })

export const UserController = {
  createUser
}