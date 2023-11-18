import express from "express";
import { UserRoutes } from "../modules/users/users.routes";
import { TeamRoutes } from "../modules/teams/teams.routes";

const router = express.Router();

const moduleRoutes = [
    {
      path: '/users',
      route: UserRoutes,
    },
    {
      path: '/teams',
      route: TeamRoutes,
    }
  ]
  
  moduleRoutes.forEach(route => router.use(route.path, route.route))
  
  export default router