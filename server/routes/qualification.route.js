import express from "express";
import qualificationController from "../controllers/qualifications.controller.js";
import authController from "../controllers/auth.controller.js";

const QualificationsRouter = express.Router();

// REST API
QualificationsRouter.post(
  "/api/qualifications",
  authController.requireSignin,
  authController.requiresAdmin,
  qualificationController.createQualification
);
QualificationsRouter.get(
  "/api/qualifications",
  authController.requireSignin,
  qualificationController.getAllQualifications
);
QualificationsRouter.get(
  "/api/qualifications/:id",
  authController.requireSignin,
  qualificationController.getQualificationById
);
QualificationsRouter.put(
  "/api/qualifications/:id",
  authController.requireSignin,
  authController.requiresAdmin,
  qualificationController.updateQualificationById
);
QualificationsRouter.delete(
  "/api/qualifications",
  authController.requireSignin,
  authController.requiresAdmin,
  qualificationController.deleteAllQualifications
);
QualificationsRouter.delete(
  "/api/qualifications/:id",
  authController.requireSignin,
  authController.requiresAdmin,
  qualificationController.deleteQualificationById
);

export default QualificationsRouter;
