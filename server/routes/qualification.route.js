import express from 'express'
import qualificationController from '../controllers/qualifications.controller.js'

const QualificationsRouter = express.Router();

// REST API
QualificationsRouter.post('/api/qualifications', qualificationController.createQualification);
QualificationsRouter.get('/api/qualifications', qualificationController.getAllQualifications);
QualificationsRouter.get('/api/qualifications/:id', qualificationController.getQualificationById);
QualificationsRouter.put('/api/qualifications/:id', qualificationController.updateQualificationById);
QualificationsRouter.delete('/api/qualifications', qualificationController.deleteAllQualifications);
QualificationsRouter.delete('/api/qualifications/:id', qualificationController.deleteQualificationById);

export default QualificationsRouter;
