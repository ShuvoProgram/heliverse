import express from "express";
import { teamController } from "./teams.controller";

const router = express.Router();

router.post('/', teamController.createTeam);
router.get(
    '/',
    teamController.getAllTeam
  )
router.get('/:id', teamController.getSingleTeam)

export const TeamRoutes = router;