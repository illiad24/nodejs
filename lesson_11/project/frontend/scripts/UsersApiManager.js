class UsersApiManager {
    static async getUsers() {
        return RequestManager.fetchData('/users')
    }
    static async addUser(data) {
        return RequestManager.postFormRequest('/users', data)
    }
    static async getUserById(id) {
        const jsonData = await RequestManager.fetchData(`/users/${id}`)
        console.log(jsonData)
        return jsonData.data
    }
    static async editUser(id, data) {
        return RequestManager.postFormRequest(`/users/${id}`, data)
    }
    static async deleteUser(id) {
        return RequestManager.deleteRequest('/users', id)
    }
}
