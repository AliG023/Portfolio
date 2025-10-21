import express from 'express'
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById
} from '../controllers/project.controller.js'

const ProjectRouter = express.Router();

// REST API
ProjectRouter.post('/', createProject);
ProjectRouter.get('/', getAllProjects);
ProjectRouter.get('/:id', getProjectById);
ProjectRouter.put('/:id', updateProjectById);
ProjectRouter.delete('/:id', deleteProjectById);

export default ProjectRouter;