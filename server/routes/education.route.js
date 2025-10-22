import express from 'express'
import {
    createEducation,
    getAllEducation,
    getEducationById,
    updateEducationById,
    deleteAllEducation,
    deleteEducationById
} from '../controllers/education.controller.js'

const EducationRouter = express.Router();

// REST API
EducationRouter.post('api/education', createEducation);
EducationRouter.get('api/education', getAllEducation);
EducationRouter.get('api/education/:id', getEducationById);
EducationRouter.put('api/education/:id', updateEducationById);
EducationRouter.delete('api/education', deleteAllEducation);
EducationRouter.delete('api/education/:id', deleteEducationById);

export default EducationRouter;
