import ProductsDBService from '../models/product/ProductsDBService.mjs'
import { parseBearer } from '../../../utils/jwtHelpers.mjs'
class ProductController {
    // Метод для отримання всіх товарів
    static async getAllProducts(req, res) {
        try {
            const productsList = await ProductsDBService.getList()

            res.status(200).json({
                products: productsList,
                user: req.user,
            })
        } catch (error) {
            res.status(500).json({ error: 'Error fetching products' })
        }
    }
    static async getProductById(req, res) {

        if (!req.user) {
            return res.status(403).json({ success: false, errors: "Access denied" })
        }

        const id = req.params.id

        try {
            const product = await ProductsDBService.getById(id)
            res.json({ success: true, data: product, user: req.user })
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message })
        }
    }

    static async registerForm(req, res) {
        try {
            if (!req.user) {
                return res.status(403).json({ error: 'Access denied' })
            }

            const id = req.params.id
            let product = null
            if (id) {
                product = await ProductsDBService.getById(id)
            }

            res.status(200).json({
                product,
                user: req.user,
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async registerProduct(req, res) {
        console.log(1)
        req.user = parseBearer(req.headers.authorization, req.headers)
        if (!req.user) {
            console.log(2)
            return res.status(403).json({ error: 'Access denied' })
        }

        const data = req.body
        console.log(data)
        try {
            const productData = {
                ...req.body,
            }
            if (req.file?.buffer) {
                productData.image = req.file.buffer.toString('base64')
            }

            if (req.params.id) {
                await ProductsDBService.update(req.params.id, productData)
            } else {
                await ProductsDBService.create(productData)
            }

            res.status(200).json({ message: 'Product registered successfully' })
        } catch (err) {
            res
                .status(500)
                .json({ errors: [{ msg: err.message }], product: data, user: req.user })
        }
    }

    // Метод для видалення товару (доступний тільки для адміністратора)
    static async deleteProduct(req, res) {
        req.user = parseBearer(req.headers.authorization, req.headers)
        if (!req.user) {

            return res.status(403).json({ error: 'Access denied' })
        }

        try {
            await ProductsDBService.deleteById(req.body.id)
            res.status(200).json({ message: 'Product deleted' })
        } catch (error) {
            res.status(500).json({ error: 'Error deleting product' })
        }
    }
}

export default ProductController
