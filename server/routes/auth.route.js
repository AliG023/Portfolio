import express from 'express'
import authController from '../controllers/auth.controller.js'

const AuthRouter = express.Router()

AuthRouter.route('/auth/signin').post(authController.signin);
AuthRouter.route('/auth/signout').get(authController.signout);

export default AuthRouter;