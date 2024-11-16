import { Router } from 'express'
import CourseController from '../controllers/coursesController.mjs'
import { checkSchema } from 'express-validator'
import CourseValidator from '../validators/courseValidator.mjs'
import SeminarController from '../controllers/seminarController.mjs'
const router = Router()
router.get('/', CourseController.courceList)
router.get('/register/:id?', CourseController.registerForm)
router.get('/seminar/:id?', SeminarController.registerForm)
router.post('/seminar/:id?', SeminarController.register)
router.post('/register/:id?', checkSchema(CourseValidator.registerSchema), CourseController.register)

router.delete('/', CourseController.deleteCource)
router.get('/:id', CourseController.courseInfo)
// delete seminar
router.delete('/seminar/:id', SeminarController.deleteSeminar)

export default router   