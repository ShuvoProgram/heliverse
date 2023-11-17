import express from "express";
import { UserController } from "./users.controller";

const router = express.Router();

router.post('/', UserController.createUser);

router.get('/', UserController.getAllUser)

router.get(
    '/:id',
    UserController.getSingleUser
  )

  router.patch(
    '/:id',
    UserController.updateUser
  );

  router.delete(
    '/:id',
    UserController.deleteUser
  )

export const UserRoutes = router