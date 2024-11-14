import Product from './Product.mjs'
import MongooseCRUDManager from './MongooseCRUDManager.mjs'

class ProductDBService extends MongooseCRUDManager {
    // я не впевнений що так робити коректно, напевно краще використовувати загальний клас коли є декілька моделей
}
export default new ProductDBService(Product)