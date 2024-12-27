import AboutController from '../controllers/aboutController.mjs'
import { Router } from 'express'
const router = Router()

//---- обробка шляху '/'
router.get('/', AboutController.info)

export default router
