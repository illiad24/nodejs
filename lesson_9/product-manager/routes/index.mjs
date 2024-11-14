import { Router } from 'express'
import ProductsControllers from "../controllers/productsControllers.mjs";
import { checkSchema } from 'express-validator'
import ProductValidator from '../validators/productValidator.mjs'
const router = Router()
router.get('/', (req, res) => {
    res.render('index', { title: 'Product Manager' })
})
router.get('/products', ProductsControllers.getList)
router.get('/addProduct', ProductsControllers.addForm)
router.post('/addProduct', checkSchema(ProductValidator.productSchema), ProductsControllers.addProduct)
router.post('/login', ProductsControllers.login)

export default router