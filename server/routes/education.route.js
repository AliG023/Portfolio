import express from 'express'
import {
    createEducation,
    getAllEducation,
    getEducationById,
    updateEducationById,
    deleteEducationById
} from '../controllers/education.controller.js'

const EducationRouter = express.Router();

// REST API
EducationRouter.post('/', createEducation);
EducationRouter.get('/', getAllEducation);
EducationRouter.get('/:id', getEducationById);
EducationRouter.put('/:id', updateEducationById);
EducationRouter.delete('/:id', deleteEducationById);

export default EducationRouter;
