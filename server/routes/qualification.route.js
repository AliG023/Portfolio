import express from 'express'
import {
    createQualification,
    getAllQualifications,
    getQualificationById,
    updateQualificationById,
    deleteAllQualifications,
    deleteQualificationById
} from '../controllers/qualifications.controller.js'

const QualificationsRouter = express.Router();

// REST API
QualificationsRouter.post('api/qualifications', createQualification);
QualificationsRouter.get('api/qualifications', getAllQualifications);
QualificationsRouter.get('api/qualifications/:id', getQualificationById);
QualificationsRouter.put('api/qualifications/:id', updateQualificationById);
QualificationsRouter.delete('api/qualifications', deleteAllQualifications);
QualificationsRouter.delete('api/qualifications/:id', deleteQualificationById);

export default QualificationsRouter;
