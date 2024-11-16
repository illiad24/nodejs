import { Router } from 'express'
import StudentController from '../controllers/studentsController.mjs'
import { checkSchema } from 'express-validator'
import StudentValidator from '../validators/studentValidator.mjs'
const router = Router()
router.delete('/', StudentController.studentDelete)
router.get('/', StudentController.studentList)
router.get('/', StudentController.studentList)

router.get('/register/:id?', StudentController.registerForm)
router.post('/register/:id?', checkSchema(StudentValidator.registerSchema), StudentController.register)
router.get('/:id', StudentController.studentInfo)

export default router