import express from 'express'
import projectController from '../controllers/project.controller.js'

const ProjectRouter = express.Router();

// REST API
ProjectRouter.post('/api/projects', projectController.createProject);
ProjectRouter.get('/api/projects', projectController.getAllProjects);
ProjectRouter.get('/api/projects/:id', projectController.getProjectById);
ProjectRouter.put('/api/projects/:id', projectController.updateProjectById);
ProjectRouter.delete('/api/projects', projectController.deleteAllProjects);
ProjectRouter.delete('/api/projects/:id', projectController.deleteProjectById);

export default ProjectRouter;