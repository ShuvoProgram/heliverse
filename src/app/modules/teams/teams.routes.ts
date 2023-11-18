import express from "express";
import { teamController } from "./teams.controller";

const router = express.Router();

router.post('/', teamController.createTeam);

export const TeamRoutes = router;