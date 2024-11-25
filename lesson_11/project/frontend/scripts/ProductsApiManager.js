class ProductsApiManager {
    static async getProducts() {
        return RequestManager.fetchData('/products')
    }
    static async addProduct(data) {

        return RequestManager.postFormRequest('/products', data)
    }
    static async getProductById(id) {
        const jsonData = await RequestManager.fetchData(`/products/${id}`)
        console.log(jsonData)
        return jsonData.data
    }
    static async editProduct(id, data) {
        return RequestManager.postFormRequest(`/products/${id}`, data)
    }
    static async deleteProduct(id) {
        console.log(id)
        return RequestManager.deleteRequest('/products', id)
    }
}
