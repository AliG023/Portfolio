import express from "express";
import projectController from "../controllers/project.controller.js";
import authController from "../controllers/auth.controller.js";

const ProjectRouter = express.Router();

// REST API
ProjectRouter.post(
  "/api/projects",
  authController.requireSignin,
  authController.requiresAdmin,
  projectController.createProject
);
ProjectRouter.get(
  "/api/projects",
  authController.requireSignin,
  projectController.getAllProjects
);
ProjectRouter.get(
  "/api/projects/:id",
  authController.requireSignin,
  projectController.getProjectById
);
ProjectRouter.put(
  "/api/projects/:id",
  authController.requireSignin,
  authController.requiresAdmin,
  projectController.updateProjectById
);
ProjectRouter.delete(
  "/api/projects",
  authController.requireSignin,
  authController.requiresAdmin,
  projectController.deleteAllProjects
);
ProjectRouter.delete(
  "/api/projects/:id",
  authController.requireSignin,
  authController.requiresAdmin,
  projectController.deleteProjectById
);

export default ProjectRouter;
