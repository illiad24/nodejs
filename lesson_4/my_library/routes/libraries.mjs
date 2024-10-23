import LibrariesController from '../controllers/librariesController.mjs'
import { Router } from 'express'
const router = Router()

//---- обробка шляху '/'
router.get('/', LibrariesController.mainProducts)
router.get('/create', LibrariesController.createProduct)
router.post('/create', LibrariesController.addProduct)

router.get('/edit/:id', LibrariesController.getEditProductForm)//new
router.post('/edit/:id', LibrariesController.updateProduct) //new

router.get('/:id', LibrariesController.productDetails)
router.delete('/', LibrariesController.deleteProduct) //new
export default router
