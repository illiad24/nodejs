import ProductDBService from "../models/ProductDBService.mjs";
import { validationResult } from 'express-validator'

class ProductsControllers {
    static async getList(req, res) {
        try {
            let products = await ProductDBService.getList()
            const sessionData = req.session.data

            console.log('===========sessionData')
            console.log(sessionData)


            if (sessionData) {
                if (sessionData.sort == 'lh') {
                    products.sort((a, b) => a.price - b.price)
                } else if (sessionData.sort == 'hl') {
                    products.sort((a, b) => b.price - a.price)
                }
            }
            res.render('products/productsList.ejs', {
                products,
            })
        } catch (error) {
            return []
        }
    }
    static async addForm(req, res) {
        try {
            res.render('products/addProductForm.ejs', { errors: [] })
        } catch (error) {
            res.status(500).json({ error: err.message })
        }
    }
    static async addProduct(req, res) {
        const errors = validationResult(req)
        console.log(errors)
        const data = req.body
        console.log(data)
        if (!errors.isEmpty()) {
            return res.status(400).render('products/addProductForm.ejs', {
                errors: errors.array(),
            })
        }
        try {
            await ProductDBService.create(data)
            req.session.data = {
                sort: 'hl'
            };
            res.redirect('/products')
        } catch (error) {
            res.status(500).render('products/addProductForm.ejs', {
                errors: [{ msg: err.message }],
            })
        }
    }
    static login(req, res) {
        try {
            req.session.data = {
                name: req.body.name,
                sort: 'lh'
            };
            console.log('Session data:', req.session.data);
            res.redirect('/products')
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}


export default ProductsControllers