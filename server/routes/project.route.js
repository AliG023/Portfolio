import express from 'express'
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteAllProjects,
    deleteProjectById
} from '../controllers/project.controller.js'

const ProjectRouter = express.Router();

// REST API
ProjectRouter.post('api/projects', createProject);
ProjectRouter.get('api/projects', getAllProjects);
ProjectRouter.get('api/projects/:id', getProjectById);
ProjectRouter.put('api/projects/:id', updateProjectById);
ProjectRouter.delete('api/projects', deleteAllProjects);
ProjectRouter.delete('api/projects/:id', deleteProjectById);

export default ProjectRouter;