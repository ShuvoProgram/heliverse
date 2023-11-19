import express from "express";
import { teamController } from "./teams.controller";

const router = express.Router();

router.post('/', teamController.createTeam);
router.get(
    '/',
    teamController.getAllTeam
  )

export const TeamRoutes = router;