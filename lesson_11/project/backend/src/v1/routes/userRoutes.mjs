import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../../../validators/userValidator.mjs'
import multer from 'multer'
const upload = multer()
import { checkSchema } from 'express-validator'

const router = express.Router()

router.get('/', UserController.usersList)

router.get('/:id?', UserController.getUserById)

router.post(
    '/:id?',
    upload.none(),
    checkSchema(UserValidator.userSchema),
    // UserValidator.checkFile,
    UserController.registerUser
)

router.delete('/', UserController.deleteUser)

export default router
