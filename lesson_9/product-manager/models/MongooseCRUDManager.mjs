class MongooseCRUDManager {
    constructor(model) {
        this.model = model
    }
    // Вибірка всього списку з бази з фільтрами, projection і populateFields
    async getList(filters) {
        try {
            const res = await this.model.find(filters)
            return res
        } catch (error) {
            return []
        }
    }
    // Створення об'єкта і збереження у базі
    async create(data) {
        try {
            const newItem = new this.model(data)
            return await newItem.save()

        } catch (error) {
            throw new Error('Error creating data: ' + error.message)
        }
    }
    // Пошук за id з використанням populateFields
    async getById(id, populateFields = []) {
        try {
            let query = this.model.findById(id)
            populateFields.forEach((field) => {
                query = query.populate(field)
            })
            return await query.exec()
        } catch (error) {
            throw new Error('Error finding data by id: ' + error.message)
        }
    }
    // Оновлення за id
    async update(id, data) {
        try {
            return await this.model
                .findByIdAndUpdate(id, data, { new: true, runValidators: true })
                .exec()
        } catch (error) {
            throw new Error('Error updating data: ' + error.message)
        }
    }
    // Видалення за id
    async deleteById(id) {
        try {
            return await this.model.findByIdAndDelete(id).exec()
        } catch (error) {
            throw new Error('Error deleting data: ' + error.message)
        }
    }
}

export default MongooseCRUDManager