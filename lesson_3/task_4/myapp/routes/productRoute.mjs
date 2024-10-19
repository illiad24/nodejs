import { Router } from 'express'

const productRouter = Router()
productRouter.get('/', (req, res) => {
    res.end('product')
    })
productRouter.get('/add', (req, res) => {
res.render('add-product', { data: 'Soon' })
})
 
export default productRouter