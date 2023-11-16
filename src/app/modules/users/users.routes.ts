import express from "express";
import { UserController } from "./users.controller";

const router = express.Router();

router.post('/', UserController.createUser);
router.get(
    '/:id',
    UserController.getSingleUser
  )

  router.delete(
    '/:id',
    UserController.deleteUser
  )

export const UserRoutes = router