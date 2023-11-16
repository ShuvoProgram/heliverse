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

  const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
  
    const result = await UserService.getSingleUser(id)
  
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'An User retrieved successfully',
      data: result,
    })
  })

  const updateUser = catchAsync(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const updatedData = req.body;
      const result = await UserService.updateUser(
        id,
        updatedData
      );
  
      sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
      });
    })
  );

// Delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.deleteUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User has been deleted successfully !',
    data: result,
  })
})


export const UserController = {
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
}